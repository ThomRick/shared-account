import { Provider } from '@nestjs/common';
import { createConnection } from 'mongoose';

export const providers: Provider[] = [
  {
    provide: 'MongodbConnection',
    useFactory: async () => await createConnection('mongodb://localhost:27017'),
  },
];
