import { IsString, IsOptional, IsArray, IsBoolean, IsInt, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project title', example: 'E-Commerce Platform' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ description: 'Project description', example: 'A full-stack e-commerce platform' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Detailed project content' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'Project image URL', example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Live project URL', example: 'https://example.com' })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  liveUrl?: string;

  @ApiPropertyOptional({ description: 'GitHub repository URL', example: 'https://github.com/user/repo' })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  githubUrl?: string;

  @ApiPropertyOptional({ description: 'Technologies used', example: ['React', 'Node.js', 'PostgreSQL'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @ApiPropertyOptional({ description: 'Project status', example: 'active', default: 'active' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Display order', example: 1, default: 0 })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiPropertyOptional({ description: 'Whether project is published', example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
