import { IsString, IsOptional, IsArray, IsBoolean, IsInt, IsUrl, MaxLength, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBlogPostDto {
  @ApiProperty({ description: 'Blog post title', example: 'Getting Started with NestJS' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ description: 'URL-friendly slug (auto-generated if not provided)', example: 'getting-started-with-nestjs' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  slug?: string;

  @ApiPropertyOptional({ description: 'Short excerpt or summary', example: 'Learn how to build APIs with NestJS' })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiProperty({ description: 'Full blog post content', example: 'This is the main content of the blog post...' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ description: 'Featured image URL', example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  featuredImage?: string;

  @ApiPropertyOptional({ description: 'Blog post tags', example: ['nestjs', 'backend', 'api'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Post status', example: 'draft', default: 'draft' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Whether post is published', example: false, default: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ description: 'Publication date', example: '2024-01-01T00:00:00Z' })
  @IsOptional()
  @IsDateString()
  publishedAt?: Date;
}
