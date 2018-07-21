import { Module, HttpModule } from '@nestjs/common';
import { ExpendsController } from './expends.controller';
import { ExpendsService } from './expends.service';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [
    ExpendsController,
  ],
  providers: [
    ExpendsService,
  ],
})
export class ExpendsModule {}
