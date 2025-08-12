import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { OptionRepository } from './options.repository';

@Module({
  controllers: [OptionsController],
  providers: [OptionsService, OptionRepository],
})
export class OptionsModule {}
