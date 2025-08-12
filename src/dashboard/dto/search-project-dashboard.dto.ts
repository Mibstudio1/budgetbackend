import { IsOptional, IsString } from 'class-validator';

export class SearchProjectDashboardDto {
  @IsOptional()
  @IsString()
  projectName: string;
}
