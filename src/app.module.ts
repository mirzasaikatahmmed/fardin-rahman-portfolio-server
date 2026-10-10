import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ProjectsModule } from "./projects/projects.module";
import { BlogModule } from "./blog/blog.module";
import { ContactModule } from "./contact/contact.module";
import { ProfileModule } from "./profile/profile.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { HealthModule } from "./health/health.module";
import { UploadModule } from "./upload/upload.module";
import { ActivitiesModule } from "./activities/activities.module";
import { LinkedInPostsModule } from "./linkedin-posts/linkedin-posts.module";
import { BackupModule } from "./backup/backup.module";
import { LinkedInPost } from "./linkedin-posts/entities/linkedin-post.entity";
import { Activity } from "./activities/entities/activity.entity";
import { Visit } from "./activities/entities/visit.entity";
import { Project } from "./projects/entities/project.entity";
import { BlogPost } from "./blog/entities/blog-post.entity";
import { ContactMessage } from "./contact/entities/contact-message.entity";
import { Profile } from "./profile/entities/profile.entity";
import { Skill } from "./profile/entities/skill.entity";
import { Experience } from "./profile/entities/experience.entity";
import { Education } from "./profile/entities/education.entity";
import { User } from "./users/entities/user.entity";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { RevalidateInterceptor } from "./common/interceptors/revalidate.interceptor";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST", "localhost"),
        port: configService.get<number>("DB_PORT", 5432),
        username: configService.get("DB_USERNAME", "postgres"),
        password: configService.get("DB_PASSWORD", "postgres"),
        database: configService.get("DB_DATABASE", "portfolio_db"),
        entities: [
          Project,
          BlogPost,
          ContactMessage,
          Profile,
          Skill,
          Experience,
          Education,
          User,
          Activity,
          Visit,
          LinkedInPost,
        ],
        synchronize: configService.get("NODE_ENV") === "development",
        logging: configService.get("NODE_ENV") === "development",
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    BlogModule,
    ContactModule,
    ProfileModule,
    HealthModule,
    UploadModule,
    ActivitiesModule,
    LinkedInPostsModule,
    BackupModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RevalidateInterceptor,
    },
  ],
})
export class AppModule {}
