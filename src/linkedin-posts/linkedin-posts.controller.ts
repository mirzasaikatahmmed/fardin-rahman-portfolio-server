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
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { LinkedInPostsService } from "./linkedin-posts.service";
import { CreateLinkedInPostDto } from "./dto/create-linkedin-post.dto";
import { UpdateLinkedInPostDto } from "./dto/update-linkedin-post.dto";

@ApiTags("linkedin-posts")
@ApiBearerAuth("JWT-auth")
@Controller("linkedin-posts")
export class LinkedInPostsController {
  constructor(private readonly linkedInPostsService: LinkedInPostsService) {}

  @Post()
  @ApiOperation({ summary: "Add a LinkedIn post" })
  @ApiResponse({ status: 201, description: "LinkedIn post created" })
  create(@Body() dto: CreateLinkedInPostDto) {
    return this.linkedInPostsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all LinkedIn posts" })
  @ApiQuery({ name: "published", required: false, example: "true" })
  @ApiResponse({ status: 200, description: "List of LinkedIn posts" })
  findAll(@Query("published") published?: string) {
    return this.linkedInPostsService.findAll(published === "true");
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a LinkedIn post by ID" })
  @ApiParam({ name: "id", description: "LinkedIn post UUID" })
  @ApiResponse({ status: 404, description: "LinkedIn post not found" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.linkedInPostsService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a LinkedIn post" })
  @ApiParam({ name: "id", description: "LinkedIn post UUID" })
  @ApiResponse({ status: 404, description: "LinkedIn post not found" })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateLinkedInPostDto,
  ) {
    return this.linkedInPostsService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a LinkedIn post" })
  @ApiParam({ name: "id", description: "LinkedIn post UUID" })
  @ApiResponse({ status: 404, description: "LinkedIn post not found" })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.linkedInPostsService.remove(id);
  }
}
