import { Module } from '@nestjs/common';
import { providers } from './infrastructure.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    ...providers,
  ],
  exports: [
    'SharedAccountRepository',
  ],
})
export class InfrastructureModule {}
