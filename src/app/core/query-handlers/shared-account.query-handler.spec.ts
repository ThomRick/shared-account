import { IRepository, InMemoryRepository } from '../../../framework/infrastructure';
import { SharedAccountAggregate } from '../domain/aggregates/impl';
import { IQueryHandler } from '../../../framework/query-handlers';
import { SharedAccountQueryHandler } from './shared-account.query-handler';

describe('Shared Account Query Handler', () => {
  it('can be created', () => {
    const repository: IRepository<SharedAccountAggregate> = new InMemoryRepository();
    const handler: IQueryHandler = new SharedAccountQueryHandler(repository);
  });
});
