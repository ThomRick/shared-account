import { Module } from '@nestjs/common';
import { providers } from './query-handlers.providers';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [
    InfrastructureModule,
  ],
  providers: [
    ...providers,
  ],
  exports: [
    'QueryHandlers',
  ],
})
export class QueryHandlersModule {}
