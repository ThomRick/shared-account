import { Module, HttpModule } from '@nestjs/common';
import { SharedAccountsController } from './shared-accounts.controller';
import { SharedAccountsService } from './shared-accounts.service';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [
    SharedAccountsController,
  ],
  providers: [
    SharedAccountsService,
  ],
})
export class SharedAccountsModule {}
