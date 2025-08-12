import { IsString } from 'class-validator';

export class SearchSalesEntryDto {
  @IsString()
  projectName: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  type: string;
}
