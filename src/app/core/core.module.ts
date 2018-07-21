import { Module } from '@nestjs/common';
import { CommandHandlersModule } from './command-handlers/command-handlers.module';

@Module({
  imports: [
    CommandHandlersModule,
  ],
  exports: [
    CommandHandlersModule,
  ],
})
export class CoreModule {}
