import { Controller, Get, Put, Body } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { SectionVisibilityService } from "./section-visibility.service";
import { UpdateSectionVisibilityDto } from "./dto/update-section-visibility.dto";
import { Public } from "../auth/decorators/public.decorator";

@ApiTags("section-visibility")
@Controller("section-visibility")
export class SectionVisibilityController {
  constructor(
    private readonly sectionVisibilityService: SectionVisibilityService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: "Get homepage section visibility" })
  @ApiResponse({ status: 200, description: "Section visibility map" })
  get() {
    return this.sectionVisibilityService.get();
  }

  @Put()
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Update homepage section visibility (upsert)" })
  @ApiResponse({ status: 200, description: "Section visibility saved" })
  update(@Body() dto: UpdateSectionVisibilityDto) {
    return this.sectionVisibilityService.update(dto);
  }
}
