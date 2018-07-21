import { Provider } from '@nestjs/common';
import { IRepository } from 'framework/infrastructure';
import { SharedAccountAggregate } from '../domain/aggregates';
import { SharedAccountQueryHandler } from './impl';
import { IQueryHandler } from 'framework/query-handlers';
import { IAggregate } from 'framework/aggregates';

export const providers: Provider[] = [
  {
    provide: 'SharedAccountQueryHandler',
    useFactory: (repository: IRepository<SharedAccountAggregate>) => new SharedAccountQueryHandler(repository),
    inject: [ 'SharedAccountRepository' ],
  },
  {
    provide: 'QueryHandlers',
    useFactory: (...handlers: IQueryHandler<IAggregate>[]) => {
      const queryHandlers = new Map<string, IQueryHandler<IAggregate>>();
      handlers.forEach(
        (handler: IQueryHandler<IAggregate>) => queryHandlers.set(
          handler.constructor.name.replace('QueryHandler', '').replace(/([A-Z])/g, '-$1').toLowerCase().slice(1),
          handler,
        ),
      );
      return queryHandlers;
    },
    inject: [ 'SharedAccountQueryHandler' ],
  },
];
