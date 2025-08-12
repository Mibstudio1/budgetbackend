import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SearchProjectDto } from './dto/search-project.dto';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectRepo.create(createProjectDto);
  }

  async findAll(searchDto: SearchProjectDto) {
    const projects = await this.projectRepo.findAll(searchDto);

    const mappedProjects = projects.map((project) => ({
      id: project.id,
      projectName: project.name,
      description: project.description,
      type: project.type,
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      createdBy: project.createdBy,
      BG_Budget: project.BG_Budget,
      expenseEntries: project.expenseEntries,
      salesEntry: project.salesEntry,
    }));

    return { projects: mappedProjects };
  }

  async update(updateDto: UpdateProjectDto) {
    // Validate that at least one field is being updated
    const { projectId, ...updateFields } = updateDto;
    const hasUpdateFields = Object.values(updateFields).some(value => value !== undefined && value !== null);
    
    if (!hasUpdateFields) {
      throw new Error('At least one field must be provided for update');
    }
    
    return await this.projectRepo.update(updateDto);
  }

  async delete(projectId: string) {
    return await this.projectRepo.delete(projectId);
  }
}
