import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LinkedInPostsService } from "./linkedin-posts.service";
import { LinkedInPostsController } from "./linkedin-posts.controller";
import { LinkedInPost } from "./entities/linkedin-post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([LinkedInPost])],
  controllers: [LinkedInPostsController],
  providers: [LinkedInPostsService],
  exports: [LinkedInPostsService],
})
export class LinkedInPostsModule {}
