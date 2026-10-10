import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { Response } from "express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { BackupService, MAX_BACKUP_BYTES } from "./backup.service";
import { RestoreBackupDto } from "./dto/restore-backup.dto";

@ApiTags("backup")
@ApiBearerAuth("JWT-auth")
@Controller("backup")
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get()
  @Header("Cache-Control", "no-store")
  @ApiOperation({ summary: "Download a full database backup (JSON)" })
  @ApiResponse({ status: 200, description: "Backup file download" })
  async download(@Res({ passthrough: true }) res: Response) {
    const { filename, content } = await this.backupService.createBackup();
    res.set({
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${filename}"`,
    });
    return new StreamableFile(content);
  }

  @Post("restore")
  @HttpCode(200)
  @ApiOperation({
    summary: "Restore the database from a backup file (replaces ALL current data)",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      required: ["file", "confirm"],
      properties: {
        file: { type: "string", format: "binary" },
        confirm: { type: "string", example: "RESTORE" },
      },
    },
  })
  @ApiResponse({ status: 200, description: "Database restored" })
  @ApiResponse({ status: 400, description: "Invalid file or missing confirmation" })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: MAX_BACKUP_BYTES, files: 1 },
    }),
  )
  restore(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body() _dto: RestoreBackupDto,
  ) {
    if (!file) {
      throw new BadRequestException("Backup file is required");
    }
    return this.backupService.restore(file.buffer);
  }
}
