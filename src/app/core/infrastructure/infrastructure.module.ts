import { Module } from '@nestjs/common';
import { providers } from './infrastructure.providers';

@Module({
  providers: [
    ...providers,
  ],
  exports: [
    'SharedAccountRepository',
  ],
})
export class InfrastructureModule {}
