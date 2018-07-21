import { Provider } from '@nestjs/common';
import { InMemoryRepository } from '../../../framework/infrastructure';
import { SharedAccountAggregate } from '../domain/aggregates';

export const providers: Provider[] = [
  {
    provide: 'SharedAccountRepository',
    useFactory: () => new InMemoryRepository<SharedAccountAggregate>(),
  },
];
