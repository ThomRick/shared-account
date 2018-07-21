import { Module } from '@nestjs/common';
import { providers } from './database.providers';

@Module({
  providers: [
    ...providers,
  ],
  exports: [
    'MongodbConnection',
  ],
})
export class DatabaseModule {}
