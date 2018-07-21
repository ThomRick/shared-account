import { Module } from '@nestjs/common';
import { CommandHandlersModule } from './command-handlers/command-handlers.module';
import { QueryHandlersModule } from './query-handlers/query-handlers.module';

@Module({
  imports: [
    CommandHandlersModule,
    QueryHandlersModule,
  ],
  exports: [
    CommandHandlersModule,
    QueryHandlersModule,
  ],
})
export class CoreModule {}
