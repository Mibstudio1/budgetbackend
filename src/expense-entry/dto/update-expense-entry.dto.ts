import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseEntryDto } from './create-expense-entry.dto';

export class UpdateExpenseEntryDto extends PartialType(CreateExpenseEntryDto) {}
