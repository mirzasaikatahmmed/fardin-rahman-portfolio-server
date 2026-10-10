import { PartialType } from "@nestjs/mapped-types";
import { CreateLinkedInPostDto } from "./create-linkedin-post.dto";

export class UpdateLinkedInPostDto extends PartialType(CreateLinkedInPostDto) {}
