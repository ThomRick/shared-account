import { IRepository, InMemoryRepository, IDocument } from '../../../../framework/infrastructure';
import { SharedAccountAggregate } from '../../domain/aggregates/impl';
import { IQueryHandler } from '../../../../framework/query-handlers';
import { SharedAccountQueryHandler } from './shared-account.query-handler';

describe('Shared Account Query Handler', () => {
  let collection: Map<string, IDocument>;
  let repository: IRepository<SharedAccountAggregate>;
  let handler: IQueryHandler<SharedAccountAggregate>;

  beforeEach(() => {
    collection = new Map<string, IDocument>();
    repository = new InMemoryRepository(collection);
    handler = new SharedAccountQueryHandler(repository);
  });

  it('should get all aggregates', async () => {
    collection.set('id', {
      _id: 'id',
      events: [
        {
          type: 'SHARED_ACCOUNT_CREATED',
          accountID: 'id',
          owner: 'owner',
          description: 'description',
        },
      ],
    });
    const aggregates: SharedAccountAggregate[] = await handler.handle() as SharedAccountAggregate[];
    expect(aggregates).toContainEqual(
      new SharedAccountAggregate().rebuild([
        {
          type: 'SHARED_ACCOUNT_CREATED',
          accountID: 'id',
          owner: 'owner',
          description: 'description',
        },
      ]),
    );
  });

  it('should get an aggregate with its id', async () => {
    collection.set('id', {
      _id: 'id',
      events: [
        {
          type: 'SHARED_ACCOUNT_CREATED',
          accountID: 'id',
          owner: 'owner',
          description: 'description',
        },
      ],
    });
    const aggregate: SharedAccountAggregate = await handler.handle('id') as SharedAccountAggregate;
    expect(aggregate).toEqual(
      new SharedAccountAggregate().rebuild([
        {
          type: 'SHARED_ACCOUNT_CREATED',
          accountID: 'id',
          owner: 'owner',
          description: 'description',
        },
      ]),
    );
  });
});
