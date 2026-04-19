import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsInt,
  IsArray,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateExperienceDto {
  @ApiProperty({
    description: "Job title",
    example: "Senior Software Engineer",
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ description: "Company name", example: "Tech Corp" })
  @IsString()
  @MaxLength(255)
  company: string;

  @ApiPropertyOptional({
    description: "Job description",
    example: "Led development of microservices architecture",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "Job location",
    example: "Dhaka, Bangladesh",
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;

  @ApiPropertyOptional({
    description: "Employment type",
    example: "Full-time",
    enum: ["Full-time", "Part-time", "Contract", "Freelance", "Internship", "Volunteer"],
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  employmentType?: string;

  @ApiPropertyOptional({
    description: "Work type",
    example: "On-site",
    enum: ["On-site", "Remote", "Hybrid"],
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  workType?: string;

  @ApiPropertyOptional({
    description: "Company logo URL",
    example: "https://example.com/logo.png",
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  companyLogo?: string;

  @ApiPropertyOptional({
    description: "Skills used in this role",
    example: ["Operations Management", "Leadership"],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({ description: "Start date", example: "2020-01-01" })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiPropertyOptional({
    description: "End date (null if current)",
    example: "2023-12-31",
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiPropertyOptional({
    description: "Whether this is current position",
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;

  @ApiPropertyOptional({ description: "Display order", example: 1, default: 0 })
  @IsOptional()
  @IsInt()
  order?: number;
}
