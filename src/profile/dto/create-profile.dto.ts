import { IsString, IsOptional, IsEmail, IsUrl, MaxLength, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ description: 'Full name', example: 'John Doe' })
  @IsString()
  @MaxLength(255)
  fullName: string;

  @ApiPropertyOptional({ description: 'Professional title', example: 'Full Stack Developer' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({ description: 'Biography or about section', example: 'Passionate developer with 5+ years of experience' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ description: 'Avatar image URL', example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  avatar?: string;

  @ApiPropertyOptional({ description: 'Email address', example: 'john.doe@example.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+1234567890' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  phone?: string;

  @ApiPropertyOptional({ description: 'Location', example: 'New York, USA' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  location?: string;

  @ApiPropertyOptional({ 
    description: 'Social media links',
    example: { github: 'https://github.com/johndoe', linkedin: 'https://linkedin.com/in/johndoe' }
  })
  @IsOptional()
  @IsObject()
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };

  @ApiPropertyOptional({ 
    description: 'Resume information',
    example: { url: 'https://example.com/resume.pdf', fileName: 'resume.pdf' }
  })
  @IsOptional()
  @IsObject()
  resume?: {
    url?: string;
    fileName?: string;
  };
}
