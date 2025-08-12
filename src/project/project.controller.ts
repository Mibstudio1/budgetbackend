import { Controller, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { SearchProjectDto } from './dto/search-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Post('all-projects')
  findAll(@Body() searchProjectDto: SearchProjectDto) {
    return this.projectService.findAll(searchProjectDto);
  }

  @Patch('update')
  update(@Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(updateProjectDto);
  }

  @Delete('delete')
  remove(@Query('projectId') projectId: string) {
    return this.projectService.delete(projectId);
  }
}
