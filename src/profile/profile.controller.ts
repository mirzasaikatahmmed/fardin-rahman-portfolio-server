import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateSkillDto } from './dto/create-skill.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CreateEducationDto } from './dto/create-education.dto';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // Profile endpoints
  @Post()
  @ApiOperation({ summary: 'Create profile' })
  @ApiResponse({ status: 201, description: 'Profile created successfully' })
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.createProfile(createProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get profile information' })
  @ApiResponse({ status: 200, description: 'Profile found' })
  getProfile() {
    return this.profileService.getProfile();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update profile' })
  @ApiParam({ name: 'id', description: 'Profile UUID' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  updateProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: Partial<CreateProfileDto>,
  ) {
    return this.profileService.updateProfile(id, updateDto);
  }

  // Skills endpoints
  @Post('skills')
  @ApiOperation({ summary: 'Create a skill' })
  @ApiResponse({ status: 201, description: 'Skill created successfully' })
  createSkill(@Body() createSkillDto: CreateSkillDto) {
    return this.profileService.createSkill(createSkillDto);
  }

  @Get('skills')
  @ApiOperation({ summary: 'Get all skills' })
  @ApiQuery({ name: 'active', required: false, description: 'Filter by active status', example: 'true' })
  @ApiResponse({ status: 200, description: 'List of skills' })
  findAllSkills(@Query('active') active?: string) {
    const activeOnly = active === 'true';
    return this.profileService.findAllSkills(activeOnly);
  }

  @Get('skills/:id')
  @ApiOperation({ summary: 'Get a skill by ID' })
  @ApiParam({ name: 'id', description: 'Skill UUID' })
  @ApiResponse({ status: 200, description: 'Skill found' })
  findSkillById(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.findSkillById(id);
  }

  @Patch('skills/:id')
  @ApiOperation({ summary: 'Update a skill' })
  @ApiParam({ name: 'id', description: 'Skill UUID' })
  @ApiResponse({ status: 200, description: 'Skill updated successfully' })
  updateSkill(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: Partial<CreateSkillDto>,
  ) {
    return this.profileService.updateSkill(id, updateDto);
  }

  @Delete('skills/:id')
  @ApiOperation({ summary: 'Delete a skill' })
  @ApiParam({ name: 'id', description: 'Skill UUID' })
  @ApiResponse({ status: 200, description: 'Skill deleted successfully' })
  removeSkill(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.removeSkill(id);
  }

  // Experience endpoints
  @Post('experiences')
  @ApiOperation({ summary: 'Create an experience entry' })
  @ApiResponse({ status: 201, description: 'Experience created successfully' })
  createExperience(@Body() createExperienceDto: CreateExperienceDto) {
    return this.profileService.createExperience(createExperienceDto);
  }

  @Get('experiences')
  @ApiOperation({ summary: 'Get all experiences' })
  @ApiResponse({ status: 200, description: 'List of experiences' })
  findAllExperiences() {
    return this.profileService.findAllExperiences();
  }

  @Get('experiences/:id')
  @ApiOperation({ summary: 'Get an experience by ID' })
  @ApiParam({ name: 'id', description: 'Experience UUID' })
  @ApiResponse({ status: 200, description: 'Experience found' })
  findExperienceById(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.findExperienceById(id);
  }

  @Patch('experiences/:id')
  @ApiOperation({ summary: 'Update an experience' })
  @ApiParam({ name: 'id', description: 'Experience UUID' })
  @ApiResponse({ status: 200, description: 'Experience updated successfully' })
  updateExperience(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: Partial<CreateExperienceDto>,
  ) {
    return this.profileService.updateExperience(id, updateDto);
  }

  @Delete('experiences/:id')
  @ApiOperation({ summary: 'Delete an experience' })
  @ApiParam({ name: 'id', description: 'Experience UUID' })
  @ApiResponse({ status: 200, description: 'Experience deleted successfully' })
  removeExperience(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.removeExperience(id);
  }

  // Education endpoints
  @Post('educations')
  @ApiOperation({ summary: 'Create an education entry' })
  @ApiResponse({ status: 201, description: 'Education created successfully' })
  createEducation(@Body() createEducationDto: CreateEducationDto) {
    return this.profileService.createEducation(createEducationDto);
  }

  @Get('educations')
  @ApiOperation({ summary: 'Get all educations' })
  @ApiResponse({ status: 200, description: 'List of educations' })
  findAllEducations() {
    return this.profileService.findAllEducations();
  }

  @Get('educations/:id')
  @ApiOperation({ summary: 'Get an education by ID' })
  @ApiParam({ name: 'id', description: 'Education UUID' })
  @ApiResponse({ status: 200, description: 'Education found' })
  findEducationById(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.findEducationById(id);
  }

  @Patch('educations/:id')
  @ApiOperation({ summary: 'Update an education' })
  @ApiParam({ name: 'id', description: 'Education UUID' })
  @ApiResponse({ status: 200, description: 'Education updated successfully' })
  updateEducation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: Partial<CreateEducationDto>,
  ) {
    return this.profileService.updateEducation(id, updateDto);
  }

  @Delete('educations/:id')
  @ApiOperation({ summary: 'Delete an education' })
  @ApiParam({ name: 'id', description: 'Education UUID' })
  @ApiResponse({ status: 200, description: 'Education deleted successfully' })
  removeEducation(@Param('id', ParseUUIDPipe) id: string) {
    return this.profileService.removeEducation(id);
  }
}
