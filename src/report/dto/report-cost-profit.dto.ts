import { IsOptional, IsString } from 'class-validator';

export class ReportCostDto {
  @IsString()
  @IsOptional()
  projectName: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  status: string;
}
