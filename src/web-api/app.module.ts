import { Module } from '@nestjs/common';
import { SharedAccountsModule } from './shared-account.ts/shared-accounts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SharedAccountsModule,
    UsersModule,
  ],
})
export class AppModule {}
