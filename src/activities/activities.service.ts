import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { Visit } from './entities/visit.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepo: Repository<Activity>,
    @InjectRepository(Visit)
    private readonly visitRepo: Repository<Visit>,
  ) {}

  // Activities
  findAllActivities(): Promise<Activity[]> {
    return this.activityRepo.find({ order: { order: 'ASC' } });
  }

  async createActivity(dto: CreateActivityDto): Promise<Activity> {
    const activity = this.activityRepo.create(dto);
    return this.activityRepo.save(activity);
  }

  async updateActivity(id: string, dto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.activityRepo.findOne({ where: { id } });
    if (!activity) throw new NotFoundException(`Activity ${id} not found`);
    Object.assign(activity, dto);
    return this.activityRepo.save(activity);
  }

  async removeActivity(id: string): Promise<void> {
    const result = await this.activityRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Activity ${id} not found`);
  }

  // Visits
  findAllVisits(): Promise<Visit[]> {
    return this.visitRepo.find({ order: { order: 'ASC' } });
  }

  async createVisit(dto: CreateVisitDto): Promise<Visit> {
    const visit = this.visitRepo.create(dto);
    return this.visitRepo.save(visit);
  }

  async updateVisit(id: string, dto: UpdateVisitDto): Promise<Visit> {
    const visit = await this.visitRepo.findOne({ where: { id } });
    if (!visit) throw new NotFoundException(`Visit ${id} not found`);
    Object.assign(visit, dto);
    return this.visitRepo.save(visit);
  }

  async removeVisit(id: string): Promise<void> {
    const result = await this.visitRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Visit ${id} not found`);
  }
}
