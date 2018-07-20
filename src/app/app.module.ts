import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { RestApiModule } from './rest-api/rest-api.module';

@Module({
  imports: [
    CoreModule,
    RestApiModule,
  ],
})
export class AppModule {}
