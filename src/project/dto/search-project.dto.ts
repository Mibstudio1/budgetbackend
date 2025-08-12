import { IsString } from 'class-validator';

export class SearchProjectDto {
  @IsString()
  projectName: string;

  @IsString()
  type: string;

  @IsString()
  status: string
}
