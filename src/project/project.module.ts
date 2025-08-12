import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectRepository } from './project.repository';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, ProjectRepository],
})
export class ProjectModule {}
