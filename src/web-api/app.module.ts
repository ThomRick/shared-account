import { Module } from '@nestjs/common';
import { SharedAccountsModule } from './shared-account.ts/shared-accounts.module';
import { UsersModule } from './users/users.module';
import { ExpendsModule } from './expends/expends.module';

@Module({
  imports: [
    SharedAccountsModule,
    UsersModule,
    ExpendsModule,
  ],
})
export class AppModule {}
