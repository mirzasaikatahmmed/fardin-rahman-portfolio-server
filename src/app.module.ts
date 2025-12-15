import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ProjectsModule } from './projects/projects.module';
import { BlogModule } from './blog/blog.module';
import { ContactModule } from './contact/contact.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { Project } from './projects/entities/project.entity';
import { BlogPost } from './blog/entities/blog-post.entity';
import { ContactMessage } from './contact/entities/contact-message.entity';
import { Profile } from './profile/entities/profile.entity';
import { Skill } from './profile/entities/skill.entity';
import { Experience } from './profile/entities/experience.entity';
import { Education } from './profile/entities/education.entity';
import { User } from './users/entities/user.entity';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'portfolio_db'),
        entities: [
          Project,
          BlogPost,
          ContactMessage,
          Profile,
          Skill,
          Experience,
          Education,
          User,
        ],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
