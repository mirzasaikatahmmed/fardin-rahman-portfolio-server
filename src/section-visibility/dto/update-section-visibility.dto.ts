import { ApiProperty } from "@nestjs/swagger";
import { IsObject } from "class-validator";

export class UpdateSectionVisibilityDto {
  @ApiProperty({
    description: "Map of section key to visibility",
    type: Object,
    example: {
      hero: true,
      about: false,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      activities: false,
      blog: true,
      linkedin: false,
      contact: true,
    },
  })
  @IsObject()
  sections: Record<string, boolean>;
}
