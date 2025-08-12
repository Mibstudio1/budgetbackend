import { IsOptional, IsString } from 'class-validator';

export class SearchMonthlyDto {
  @IsString()
  @IsOptional()
  projectName: string;

  @IsString()
  @IsOptional()
  month: string;

  @IsString()
  @IsOptional()
  year: string;
}
