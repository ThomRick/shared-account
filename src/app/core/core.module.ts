import { Module } from '@nestjs/common';
import { providers } from './core.providers';

@Module({
  providers: [
    ...providers,
  ],
  exports: [
    'CommandHandlers',
  ],
})
export class CoreModule {}
