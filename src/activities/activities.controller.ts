import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  // --- Activities ---

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all activities' })
  findAllActivities() {
    return this.activitiesService.findAllActivities();
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create activity' })
  createActivity(@Body() dto: CreateActivityDto) {
    return this.activitiesService.createActivity(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update activity' })
  updateActivity(@Param('id') id: string, @Body() dto: UpdateActivityDto) {
    return this.activitiesService.updateActivity(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete activity' })
  removeActivity(@Param('id') id: string) {
    return this.activitiesService.removeActivity(id);
  }

  // --- Visits ---

  @Public()
  @Get('visits')
  @ApiOperation({ summary: 'Get all visits' })
  findAllVisits() {
    return this.activitiesService.findAllVisits();
  }

  @Post('visits')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create visit' })
  createVisit(@Body() dto: CreateVisitDto) {
    return this.activitiesService.createVisit(dto);
  }

  @Patch('visits/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update visit' })
  updateVisit(@Param('id') id: string, @Body() dto: UpdateVisitDto) {
    return this.activitiesService.updateVisit(id, dto);
  }

  @Delete('visits/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete visit' })
  removeVisit(@Param('id') id: string) {
    return this.activitiesService.removeVisit(id);
  }
}
