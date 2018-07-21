import { Module } from '@nestjs/common';
import { SharedAccountsModule } from './shared-account.ts/shared-accounts.module';

@Module({
  imports: [
    SharedAccountsModule,
  ],
})
export class AppModule {}
