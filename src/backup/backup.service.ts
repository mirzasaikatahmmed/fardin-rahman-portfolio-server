import {
  BadRequestException,
  Injectable,
  Logger,
  PayloadTooLargeException,
} from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, EntityMetadata } from "typeorm";
import { promises as fs } from "fs";
import { join } from "path";

export const BACKUP_FORMAT = "portfolio-backup";
export const BACKUP_VERSION = 1;
export const MAX_BACKUP_BYTES = 50 * 1024 * 1024;

const SAFETY_BACKUP_DIR = join(process.cwd(), "backups");
const SAFETY_BACKUPS_TO_KEEP = 3;
const INSERT_CHUNK_SIZE = 200;

type Row = Record<string, unknown>;

interface BackupFile {
  format: typeof BACKUP_FORMAT;
  version: typeof BACKUP_VERSION;
  createdAt: string;
  tables: Record<string, Row[]>;
}

export interface RestoreResult {
  restoredAt: string;
  tables: Record<string, number>;
  safetyBackup: string;
}

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);
  private restoreInProgress = false;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async createBackup(): Promise<{ filename: string; content: Buffer }> {
    const backup = await this.buildBackup();
    const stamp = backup.createdAt.replace(/[:.]/g, "-");
    this.logger.log(`Backup created (${Object.keys(backup.tables).length} tables)`);
    return {
      filename: `portfolio-backup-${stamp}.json`,
      content: Buffer.from(JSON.stringify(backup)),
    };
  }

  async restore(fileBuffer: Buffer): Promise<RestoreResult> {
    if (fileBuffer.length > MAX_BACKUP_BYTES) {
      throw new PayloadTooLargeException("Backup file is too large");
    }
    if (this.restoreInProgress) {
      throw new BadRequestException("A restore is already in progress");
    }

    this.restoreInProgress = true;
    try {
      const backup = this.parseBackup(fileBuffer);
      const safetyBackup = await this.writeSafetyBackup();

      await this.dataSource.transaction(async (manager) => {
        const quotedTables = this.metadatas()
          .map((meta) => `"${meta.tableName.replace(/"/g, '""')}"`)
          .join(", ");
        await manager.query(`TRUNCATE TABLE ${quotedTables} RESTART IDENTITY`);

        for (const meta of this.metadatas()) {
          const rows = backup.tables[meta.tableName];
          for (let i = 0; i < rows.length; i += INSERT_CHUNK_SIZE) {
            await manager
              .createQueryBuilder()
              .insert()
              .into(meta.target)
              .values(rows.slice(i, i + INSERT_CHUNK_SIZE))
              .callListeners(false)
              .execute();
          }
        }
      });

      const tables = Object.fromEntries(
        Object.entries(backup.tables).map(([name, rows]) => [name, rows.length]),
      );
      this.logger.warn(`Database restored from backup dated ${backup.createdAt}`);
      return { restoredAt: new Date().toISOString(), tables, safetyBackup };
    } finally {
      this.restoreInProgress = false;
    }
  }

  private metadatas(): EntityMetadata[] {
    return this.dataSource.entityMetadatas.filter((meta) => meta.tableType === "regular");
  }

  private async buildBackup(): Promise<BackupFile> {
    const tables: Record<string, Row[]> = {};
    await this.dataSource.transaction("REPEATABLE READ", async (manager) => {
      for (const meta of this.metadatas()) {
        tables[meta.tableName] = (await manager.find(meta.target)) as Row[];
      }
    });
    return {
      format: BACKUP_FORMAT,
      version: BACKUP_VERSION,
      createdAt: new Date().toISOString(),
      tables,
    };
  }

  private parseBackup(fileBuffer: Buffer): BackupFile {
    let parsed: unknown;
    try {
      parsed = JSON.parse(fileBuffer.toString("utf8"));
    } catch {
      throw new BadRequestException("Backup file is not valid JSON");
    }

    if (!this.isRecord(parsed) || parsed.format !== BACKUP_FORMAT) {
      throw new BadRequestException("File is not a portfolio backup");
    }
    if (parsed.version !== BACKUP_VERSION) {
      throw new BadRequestException(`Unsupported backup version: ${String(parsed.version)}`);
    }
    if (typeof parsed.createdAt !== "string" || !this.isRecord(parsed.tables)) {
      throw new BadRequestException("Backup file is malformed");
    }

    const metadatas = this.metadatas();
    const knownTables = new Set(metadatas.map((meta) => meta.tableName));
    for (const name of Object.keys(parsed.tables)) {
      if (!knownTables.has(name)) {
        throw new BadRequestException(`Unknown table in backup: ${name}`);
      }
    }

    for (const meta of metadatas) {
      const rows = parsed.tables[meta.tableName];
      if (!Array.isArray(rows)) {
        throw new BadRequestException(`Backup is missing table: ${meta.tableName}`);
      }
      const knownColumns = new Set(meta.columns.map((column) => column.propertyName));
      const requiredColumns = meta.columns.filter(
        (column) => !column.isNullable && column.default === undefined && !column.isGenerated,
      );
      for (const row of rows) {
        if (!this.isRecord(row)) {
          throw new BadRequestException(`Invalid row in table: ${meta.tableName}`);
        }
        for (const key of Object.keys(row)) {
          if (!knownColumns.has(key)) {
            throw new BadRequestException(`Unknown column "${key}" in table: ${meta.tableName}`);
          }
        }
        for (const column of requiredColumns) {
          if (row[column.propertyName] === undefined || row[column.propertyName] === null) {
            throw new BadRequestException(
              `Missing value for "${column.propertyName}" in table: ${meta.tableName}`,
            );
          }
        }
      }
    }

    return parsed as unknown as BackupFile;
  }

  private async writeSafetyBackup(): Promise<string> {
    const { filename, content } = await this.createBackup();
    const safetyName = `pre-restore-${filename}`;
    await fs.mkdir(SAFETY_BACKUP_DIR, { recursive: true });
    await fs.writeFile(join(SAFETY_BACKUP_DIR, safetyName), content);

    const existing = (await fs.readdir(SAFETY_BACKUP_DIR))
      .filter((name) => name.startsWith("pre-restore-"))
      .sort();
    const stale = existing.slice(0, Math.max(0, existing.length - SAFETY_BACKUPS_TO_KEEP));
    await Promise.all(stale.map((name) => fs.unlink(join(SAFETY_BACKUP_DIR, name))));
    return safetyName;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
}
