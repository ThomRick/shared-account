import { SharedAccountAggregate } from './shared-account.aggregate';
import { SharedAccountCreated, SharedAccountUserAdded, SharedAccountExpendAdded, SharedAccountClosed } from '../../events';
import { Expend } from '../models';

describe('Shared Account Aggregate', () => {
  it('should have a SharedAccountCreated event when create a new SharedAccount', () => {
    const description: string = 'description';
    const owner: string = 'owner';
    const aggregate = new SharedAccountAggregate();
    aggregate.create(description, owner);
    expect(aggregate.id).toBeDefined();
    expect(aggregate.owner).toEqual(owner);
    expect(aggregate.description).toEqual(description);
    expect(aggregate.users).toEqual([ owner ]);
    expect(aggregate.expends).toEqual([]);
    expect(aggregate.uncommittedChanges).toContainEqual(
      new SharedAccountCreated(aggregate.id, owner, description),
    );
  });

  it('should have a SharedAccountUserAdded event when add a new user', () => {
    const description: string = 'description';
    const owner: string = 'owner';
    const aggregate = new SharedAccountAggregate();
    aggregate.create(description, owner);
    const newUser = 'newUser';
    aggregate.addUser(newUser);
    expect(aggregate.users).toEqual([ owner, newUser ]);
    expect(aggregate.uncommittedChanges).toContainEqual(
      new SharedAccountUserAdded(aggregate.id, 'newUser'),
    );
  });

  it('should have a SharedAccountExpendAdded event when add a new expend', () => {
    const description: string = 'description';
    const owner: string = 'owner';
    const aggregate = new SharedAccountAggregate();
    aggregate.create(description, owner);
    const newUser = 'newUser';
    aggregate.addUser(newUser);
    const expend: Expend = {
      owner,
      involvedUsers: [ owner, newUser ],
      amount: 100,
    };
    aggregate.addExpend(expend);
    expect(aggregate.expends).toEqual([ expend ]);
    expect(aggregate.uncommittedChanges).toContainEqual(
      new SharedAccountExpendAdded(aggregate.id, expend),
    );
  });

  it('should have a SharedAccountClosed event when close the shared accound', () => {
    const description: string = 'description';
    const owner: string = 'owner';
    const aggregate = new SharedAccountAggregate();
    aggregate.create(description, owner);
    aggregate.close('reason');
    expect(aggregate.uncommittedChanges).toContainEqual(
      new SharedAccountClosed(aggregate.id, 'reason'),
    );
  });

  it('should transform the aggregate into a read-model when map', () => {
    const description: string = 'description';
    const owner: string = 'owner';
    const aggregate = new SharedAccountAggregate();
    aggregate.create(description, owner);
    const model = aggregate.map((account: SharedAccountAggregate) => ({
      id: account.id,
    }));
    expect(model).toEqual({
      id: aggregate.id,
    });
  });
});
