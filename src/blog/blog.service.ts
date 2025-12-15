import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const blogPost = this.blogPostRepository.create(createBlogPostDto);
    
    // Generate slug if not provided
    if (!blogPost.slug) {
      blogPost.slug = this.generateSlug(blogPost.title);
    }
    
    return await this.blogPostRepository.save(blogPost);
  }

  async findAll(publishedOnly: boolean = false): Promise<BlogPost[]> {
    const queryBuilder = this.blogPostRepository.createQueryBuilder('post');
    
    if (publishedOnly) {
      queryBuilder.where('post.isPublished = :isPublished', { isPublished: true });
    }
    
    return await queryBuilder
      .orderBy('post.publishedAt', 'DESC')
      .addOrderBy('post.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: string): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOne({ where: { id } });
    
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    
    // Increment views
    post.views += 1;
    await this.blogPostRepository.save(post);
    
    return post;
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOne({ where: { slug } });
    
    if (!post) {
      throw new NotFoundException(`Blog post with slug ${slug} not found`);
    }
    
    // Increment views
    post.views += 1;
    await this.blogPostRepository.save(post);
    
    return post;
  }

  async update(id: string, updateBlogPostDto: UpdateBlogPostDto): Promise<BlogPost> {
    const post = await this.findOne(id);
    Object.assign(post, updateBlogPostDto);
    return await this.blogPostRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.blogPostRepository.remove(post);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
