import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpenseEntryDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  expenseItem: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsNotEmpty()
  cost: number;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsBoolean()
  @IsNotEmpty()
  isPaid: boolean;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  note?: string;
}
