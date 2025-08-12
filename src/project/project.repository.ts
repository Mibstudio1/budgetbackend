import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchProjectDto } from './dto/search-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async findAll({ projectName, type, status }: SearchProjectDto) {
    return this.prisma.bG_Project.findMany({
      where: {
        name: projectName
          ? { contains: projectName, mode: 'insensitive' }
          : undefined,
        type: type ? { contains: type, mode: 'insensitive' } : undefined,
        status: status ? { contains: status, mode: 'insensitive' } : undefined,
      },
      include: {
        BG_Budget: true,
        expenseEntries: true,
        salesEntry: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create({
    projectName,
    description,
    projectGroup,
    projectStatus,
    startDate,
    endDate,
    createdBy,
  }: CreateProjectDto) {
    return this.prisma.bG_Project.create({
      data: {
        name: projectName,
        description,
        type: projectGroup,
        status: projectStatus,
        startDate,
        endDate,
        createdBy,
      },
    });
  }

  async update(updateDto: UpdateProjectDto) {
    const {
      projectId,
      projectName,
      description,
      projectGroup,
      projectStatus,
      startDate,
      endDate,
      createdBy,
    } = updateDto;

    try {
      // Build update data object, only including defined fields
      const updateData: any = {};
      
      if (projectName !== undefined) updateData.name = projectName;
      if (description !== undefined) updateData.description = description;
      if (projectGroup !== undefined) updateData.type = projectGroup;
      if (projectStatus !== undefined) updateData.status = projectStatus;
      if (startDate !== undefined) updateData.startDate = startDate;
      if (endDate !== undefined) updateData.endDate = endDate;
      if (createdBy !== undefined) updateData.createdBy = createdBy;
      
      // Always update the updatedAt field
      updateData.updatedAt = new Date();

      // Verify project exists before updating
      const existingProject = await this.prisma.bG_Project.findUnique({
        where: { id: projectId },
      });

      if (!existingProject) {
        throw new Error(`Project with ID ${projectId} not found`);
      }

      const updatedProject = await this.prisma.bG_Project.update({
        where: { id: projectId },
        data: updateData,
      });
      
      return updatedProject;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error(`Project with ID ${projectId} not found`);
      }
      throw new Error(`Failed to update project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async delete(projectId: string) {
    await this.prisma.bG_Project.delete({
      where: {
        id: projectId,
      },
    });
  }
}
