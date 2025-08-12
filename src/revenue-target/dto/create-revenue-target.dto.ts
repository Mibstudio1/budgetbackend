import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateRevenueTargetDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  target: number;

  @IsString()
  @IsOptional()
  createdBy?: string;
}
