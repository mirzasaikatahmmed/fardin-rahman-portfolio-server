import { IsString, IsNotEmpty, IsOptional, IsInt, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const ACTIVITY_TYPES = ['leadership', 'event', 'creative', 'ambassador', 'volunteer', 'member'];

export class CreateActivityDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  organization: string;

  @ApiProperty({ enum: ACTIVITY_TYPES })
  @IsString()
  @IsIn(ACTIVITY_TYPES)
  type: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  order?: number;
}
