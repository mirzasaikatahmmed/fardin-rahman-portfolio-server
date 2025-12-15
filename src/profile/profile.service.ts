import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { Skill } from './entities/skill.entity';
import { Experience } from './entities/experience.entity';
import { Education } from './entities/education.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateEducationDto } from './dto/create-education.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  // Profile methods
  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create(createProfileDto);
    return await this.profileRepository.save(profile);
  }

  async getProfile(): Promise<Profile | null> {
    return await this.profileRepository.findOne({
      order: { createdAt: 'DESC' },
    });
  }

  async updateProfile(id: string, updateDto: Partial<CreateProfileDto>): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id } });
    
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    
    Object.assign(profile, updateDto);
    return await this.profileRepository.save(profile);
  }

  // Skill methods
  async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create(createSkillDto);
    return await this.skillRepository.save(skill);
  }

  async findAllSkills(activeOnly: boolean = false): Promise<Skill[]> {
    const queryBuilder = this.skillRepository.createQueryBuilder('skill');
    
    if (activeOnly) {
      queryBuilder.where('skill.isActive = :isActive', { isActive: true });
    }
    
    return await queryBuilder
      .orderBy('skill.category', 'ASC')
      .addOrderBy('skill.order', 'ASC')
      .getMany();
  }

  async findSkillById(id: string): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    
    return skill;
  }

  async updateSkill(id: string, updateDto: Partial<CreateSkillDto>): Promise<Skill> {
    const skill = await this.findSkillById(id);
    Object.assign(skill, updateDto);
    return await this.skillRepository.save(skill);
  }

  async removeSkill(id: string): Promise<void> {
    const skill = await this.findSkillById(id);
    await this.skillRepository.remove(skill);
  }

  // Experience methods
  async createExperience(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    const experience = this.experienceRepository.create(createExperienceDto);
    return await this.experienceRepository.save(experience);
  }

  async findAllExperiences(): Promise<Experience[]> {
    return await this.experienceRepository.find({
      order: { order: 'ASC', startDate: 'DESC' },
    });
  }

  async findExperienceById(id: string): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({ where: { id } });
    
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    
    return experience;
  }

  async updateExperience(id: string, updateDto: Partial<CreateExperienceDto>): Promise<Experience> {
    const experience = await this.findExperienceById(id);
    Object.assign(experience, updateDto);
    return await this.experienceRepository.save(experience);
  }

  async removeExperience(id: string): Promise<void> {
    const experience = await this.findExperienceById(id);
    await this.experienceRepository.remove(experience);
  }

  // Education methods
  async createEducation(createEducationDto: CreateEducationDto): Promise<Education> {
    const education = this.educationRepository.create(createEducationDto);
    return await this.educationRepository.save(education);
  }

  async findAllEducations(): Promise<Education[]> {
    return await this.educationRepository.find({
      order: { order: 'ASC', startDate: 'DESC' },
    });
  }

  async findEducationById(id: string): Promise<Education> {
    const education = await this.educationRepository.findOne({ where: { id } });
    
    if (!education) {
      throw new NotFoundException(`Education with ID ${id} not found`);
    }
    
    return education;
  }

  async updateEducation(id: string, updateDto: Partial<CreateEducationDto>): Promise<Education> {
    const education = await this.findEducationById(id);
    Object.assign(education, updateDto);
    return await this.educationRepository.save(education);
  }

  async removeEducation(id: string): Promise<void> {
    const education = await this.findEducationById(id);
    await this.educationRepository.remove(education);
  }
}
