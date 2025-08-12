import { Injectable } from '@nestjs/common';
import { SearchProjectDashboardDto } from './dto/search-project-dashboard.dto';
import { DashboardRepo } from './dashboard.repository';
import { SearchMonthlyDto } from './dto/search-monthly-dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly dashBoardRepo: DashboardRepo) {}

  async searchProject(searchProjectDto: SearchProjectDashboardDto) {
    const { search, all } =
      await this.dashBoardRepo.searchProject(searchProjectDto);
    return { search, all };
  }

  async searchMonthly(searchMonthlyDto: SearchMonthlyDto) {
    const { search, all, revenue } =
      await this.dashBoardRepo.searchMonthly(searchMonthlyDto);
    return { search, all, revenue };
  }
}
