import { IsOptional, IsString } from 'class-validator';

export class ReportOutstandDto {
  @IsString()
  @IsOptional()
  projectName: string;

  @IsString()
  @IsOptional()
  item: string;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate: string;
}
