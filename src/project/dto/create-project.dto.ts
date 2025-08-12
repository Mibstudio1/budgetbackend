import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  projectGroup: string;

  @IsString()
  @IsNotEmpty()
  projectStatus: string;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
