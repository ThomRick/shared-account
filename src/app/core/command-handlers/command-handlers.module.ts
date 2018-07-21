import { Module } from '@nestjs/common';
import { providers } from './command-handlers.providers';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [
    InfrastructureModule,
  ],
  providers: [
    ...providers,
  ],
  exports: [
    'CommandHandlers',
  ],
})
export class CommandHandlersModule {}
