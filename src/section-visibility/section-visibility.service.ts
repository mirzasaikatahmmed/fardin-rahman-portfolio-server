import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SectionVisibility } from "./entities/section-visibility.entity";
import { UpdateSectionVisibilityDto } from "./dto/update-section-visibility.dto";
import {
  DEFAULT_SECTIONS,
  SECTION_KEYS,
  SectionKey,
} from "./section-visibility.constants";

@Injectable()
export class SectionVisibilityService {
  constructor(
    @InjectRepository(SectionVisibility)
    private readonly repository: Repository<SectionVisibility>,
  ) {}

  private async getRow(): Promise<SectionVisibility | null> {
    const rows = await this.repository.find({
      order: { createdAt: "DESC" },
      take: 1,
    });
    return rows[0] ?? null;
  }

  private normalize(
    input: Record<string, unknown> = {},
  ): Record<SectionKey, boolean> {
    const sections = { ...DEFAULT_SECTIONS };
    for (const key of SECTION_KEYS) {
      if (typeof input[key] === "boolean") {
        sections[key] = input[key] as boolean;
      }
    }
    return sections;
  }

  async get(): Promise<{ sections: Record<SectionKey, boolean> }> {
    const row = await this.getRow();
    return { sections: this.normalize(row?.sections) };
  }

  async update(
    dto: UpdateSectionVisibilityDto,
  ): Promise<{ sections: Record<SectionKey, boolean> }> {
    const row = await this.getRow();
    const sections = this.normalize({ ...(row?.sections ?? {}), ...dto.sections });

    if (row) {
      row.sections = sections;
      await this.repository.save(row);
    } else {
      await this.repository.save(this.repository.create({ sections }));
    }

    return { sections };
  }
}
