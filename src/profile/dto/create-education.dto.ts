import { IsString, IsOptional, IsDateString, IsInt, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEducationDto {
  @ApiProperty({ description: 'Degree name', example: 'Bachelor of Science' })
  @IsString()
  @MaxLength(255)
  degree: string;

  @ApiProperty({ description: 'Institution name', example: 'University of Technology' })
  @IsString()
  @MaxLength(255)
  institution: string;

  @ApiPropertyOptional({ description: 'Field of study', example: 'Computer Science' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  field?: string;

  @ApiPropertyOptional({ description: 'Education description', example: 'Focused on software engineering and algorithms' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Start date', example: '2016-09-01' })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiPropertyOptional({ description: 'End date', example: '2020-05-31' })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiPropertyOptional({ description: 'Certificate URL', example: 'https://example.com/certificate.pdf' })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  certificateUrl?: string;

  @ApiPropertyOptional({ description: 'Display order', example: 1, default: 0 })
  @IsOptional()
  @IsInt()
  order?: number;
}
