import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { QueriesController } from './queries.controller';

@Module({
  imports: [
    CoreModule,
  ],
  controllers: [
    QueriesController,
  ],
})
export class QueriesModule {}
