import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { CommandsController } from './commands.controller';

@Module({
  imports: [
    CoreModule,
  ],
  controllers: [
    CommandsController,
  ],
})
export class CommandsModule {}
