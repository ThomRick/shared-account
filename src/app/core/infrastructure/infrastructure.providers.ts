import { Provider } from '@nestjs/common';
import { InMemoryRepository, IDocument, MongoRepository } from '../../../framework/infrastructure';
import { SharedAccountAggregate } from '../domain/aggregates';
import { Connection } from 'mongoose';

export const providers: Provider[] = [
  {
    provide: 'SharedAccountCollection',
    useFactory: (connection: Connection) => {
      if (!!connection) {
        return connection.createCollection('shared-accounts');
      } else {
        return new Map<string, IDocument>();
      }
    },
    inject: [ 'MongodbConnection' ],
  },
  {
    provide: 'SharedAccountRepository',
    useFactory: async (collection) => {
      if (collection instanceof Map) {
        return new InMemoryRepository<SharedAccountAggregate>(collection);
      } else {
        return new MongoRepository<SharedAccountAggregate>(collection);
      }
    },
    inject: [ 'SharedAccountCollection' ],
  },
];
