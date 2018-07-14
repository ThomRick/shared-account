import { IRepositoryBase } from '../interfaces';
import { BankAccountAggregate } from '../../aggregates/implementations/bank-account.aggregate';
import { IEventBase } from '../../events';
import { InMemoryRepository } from './in-memory-repository';

describe('In Memory Repository', () => {
  let collection: Map<string, IEventBase[]>;
  let repository: IRepositoryBase<BankAccountAggregate>;

  beforeEach(() => {
    collection = new Map<string, IEventBase[]>();
    repository = new InMemoryRepository<BankAccountAggregate>(BankAccountAggregate, collection);
  });

  it('should insert aggregate uncommitted changes in the collection', async () => {
    const aggregate = new BankAccountAggregate();
    aggregate.create().deposit(100).withdraw(50);
    expect(await repository.insert(aggregate)).toBeTruthy();
    expect(collection.get(aggregate.id)).toBeDefined();
  });

  it('should retrieve all aggregates from collection when find all', async () => {
    const aggregate = new BankAccountAggregate();
    aggregate.create().deposit(100).withdraw(50);
    collection.set(aggregate.id, aggregate.uncommittedChanges);
    const aggreates: BankAccountAggregate[] = await repository.findAll();
    expect(aggreates[ 0 ].id).toEqual(aggregate.id);
    expect(aggreates[ 0 ].model).toEqual(aggregate.model);
    expect(aggreates[ 0 ].uncommittedChanges.length).toEqual(0);
  });

  it('should retrieve an aggregate by id when find with id as query', async () => {
    const aggregate = new BankAccountAggregate();
    aggregate.create().deposit(100).withdraw(50);
    collection.set(aggregate.id, aggregate.uncommittedChanges);
    const foundAggregate: BankAccountAggregate = await repository.find(
      (current: BankAccountAggregate) => current.id === aggregate.id,
    );
    expect(foundAggregate.id).toEqual(aggregate.id);
    expect(foundAggregate.model).toEqual(aggregate.model);
  });
});
