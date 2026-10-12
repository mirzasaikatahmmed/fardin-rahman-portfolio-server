import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SectionVisibilityService } from "./section-visibility.service";
import { SectionVisibilityController } from "./section-visibility.controller";
import { SectionVisibility } from "./entities/section-visibility.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SectionVisibility])],
  controllers: [SectionVisibilityController],
  providers: [SectionVisibilityService],
  exports: [SectionVisibilityService],
})
export class SectionVisibilityModule {}
