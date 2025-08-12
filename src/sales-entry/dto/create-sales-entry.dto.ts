import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSalesEntryDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  description: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Total price must have at most 2 decimal places' },
  )
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
