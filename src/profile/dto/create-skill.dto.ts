import { IsString, IsInt, IsOptional, IsBoolean, MaxLength, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({ description: 'Skill name', example: 'JavaScript' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'Skill category', example: 'Programming Language' })
  @IsString()
  @MaxLength(100)
  category: string;

  @ApiPropertyOptional({ description: 'Proficiency level (0-100)', example: 85, minimum: 0, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  proficiency?: number;

  @ApiPropertyOptional({ description: 'Icon URL or class name', example: 'fab fa-js' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  icon?: string;

  @ApiPropertyOptional({ description: 'Display order', example: 1, default: 0 })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional({ description: 'Whether skill is active', example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
