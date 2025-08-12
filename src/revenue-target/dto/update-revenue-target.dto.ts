import { PartialType } from '@nestjs/mapped-types';
import { CreateRevenueTargetDto } from './create-revenue-target.dto';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateRevenueTargetDto extends PartialType(CreateRevenueTargetDto) {
  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsNumber()
  target?: number;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
