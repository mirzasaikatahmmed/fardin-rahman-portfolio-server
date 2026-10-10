import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LinkedInPost } from "./entities/linkedin-post.entity";
import { CreateLinkedInPostDto } from "./dto/create-linkedin-post.dto";
import { UpdateLinkedInPostDto } from "./dto/update-linkedin-post.dto";

@Injectable()
export class LinkedInPostsService {
  constructor(
    @InjectRepository(LinkedInPost)
    private readonly linkedInPostRepository: Repository<LinkedInPost>,
  ) {}

  async create(dto: CreateLinkedInPostDto): Promise<LinkedInPost> {
    const post = this.linkedInPostRepository.create(dto);
    return await this.linkedInPostRepository.save(post);
  }

  async findAll(publishedOnly: boolean = false): Promise<LinkedInPost[]> {
    return await this.linkedInPostRepository.find({
      where: publishedOnly ? { isPublished: true } : {},
      order: { order: "ASC", createdAt: "DESC" },
    });
  }

  async findOne(id: string): Promise<LinkedInPost> {
    const post = await this.linkedInPostRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`LinkedIn post with ID ${id} not found`);
    }

    return post;
  }

  async update(
    id: string,
    dto: UpdateLinkedInPostDto,
  ): Promise<LinkedInPost> {
    const post = await this.findOne(id);
    Object.assign(post, dto);
    return await this.linkedInPostRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.linkedInPostRepository.remove(post);
  }
}
