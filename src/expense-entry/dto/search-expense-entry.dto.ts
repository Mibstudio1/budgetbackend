import { IsBoolean, IsString } from 'class-validator';

export class SearchExpenseDto {
  @IsString()
  search: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  category: string;

  @IsString()
  status: string;
}
