import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesEntryDto } from './create-sales-entry.dto';

export class UpdateSalesEntryDto extends PartialType(CreateSalesEntryDto) {}
