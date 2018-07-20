import { SharedAccountAggregateImpl } from './shared-account.aggregate';
import { SharedAccountCreated, SharedAccountUserAdded, SharedAccountExpendAdded, SharedAccountClosed } from '../../events';
import { SharedAccountModelImpl, IExpend } from '../../read-models';
import { AbstractAggregate } from '../../../../../framework/aggregates';

describe('Shared Account Aggregate', () => {
  it('should have a SharedAccountCreated event when create a new SharedAccount', () => {
    const description: string = 'description';
    const owner: string = 'owner';
    const aggregate = new SharedAccountAggregateImpl();
    aggregate.create(description, owner);
    expect(aggregate.uncommittedChanges).toContainEqual(
      new SharedAccountCreated(aggregate.id, owner, description),
    );
    expect(aggregate.model).toEqual(
      new SharedAccountModelImpl(aggregate.id, owner, description),
    );
  });

  it('should have a SharedAccountUserAdded event when add a new user', () => {
    const description: string = 'description';
    const owner: string = 'owner';
    const aggregate = new SharedAccountAggregateImpl();
    aggregate.create(description, owner);
    aggregate.addUser('newUser');
    expect(aggregate.uncommittedChanges).toContainEqual(
      new SharedAccountUserAdded(aggregate.id, 'newUser'),
    );
  });

  it('should have a SharedAccountExpendAdded event when add a new expend', () => {
    const description: string = 'description';
    const owner: string = 'owner';
    const aggregate = new SharedAccountAggregateImpl();
    aggregate.create(description, owner);
    const newUser = 'newUser';
    aggregate.addUser(newUser);
    const expend: IExpend = {
      owner,
      involvedUsers: [ owner, newUser ],
      amount: 100,
    };
    aggregate.addExpend(expend);
    expect(aggregate.uncommittedChanges).toContainEqual(
      new SharedAccountExpendAdded(aggregate.id, expend),
    );
  });

  it('should have a SharedAccountClosed event when close the shared accound', () => {
    const description: string = 'description';
    const owner: string = 'owner';
    const aggregate = new SharedAccountAggregateImpl();
    aggregate.create(description, owner);
    aggregate.close('reason');
    expect(aggregate.uncommittedChanges).toContainEqual(
      new SharedAccountClosed(aggregate.id, 'reason'),
    );
    expect(aggregate.model).toEqual(null);
  });

  it('should transform the aggregate into a read-model when map', () => {
    const description: string = 'description';
    const owner: string = 'owner';
    const aggregate = new SharedAccountAggregateImpl();
    aggregate.create(description, owner);
    const model = aggregate.map((agg: AbstractAggregate) => ({
      id: agg.id,
    }));
    expect(model).toEqual({
      id: aggregate.id,
    });
  });
});
