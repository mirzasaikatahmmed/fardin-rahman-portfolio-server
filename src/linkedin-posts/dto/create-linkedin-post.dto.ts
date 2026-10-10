import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  Matches,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateLinkedInPostDto {
  @ApiProperty({
    description: "Public LinkedIn post URL",
    example:
      "https://www.linkedin.com/posts/username_slug-activity-1234567890123456789-AbCd",
  })
  @IsString()
  @MaxLength(500)
  @Matches(/^https:\/\/([a-z]+\.)?linkedin\.com\/\S+$/i, {
    message: "url must be a https://linkedin.com post link",
  })
  url: string;

  @ApiPropertyOptional({ description: "Optional caption shown with the post" })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  caption?: string;

  @ApiPropertyOptional({ description: "Display order", example: 0, default: 0 })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional({
    description: "Whether the post is shown on the website",
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
