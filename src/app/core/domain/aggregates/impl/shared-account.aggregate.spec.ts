import { SharedAccountAggregateImpl } from './shared-account.aggregate';
import { SharedAccountEventType, SharedAccountCreated } from '../../events';
import { SharedAccountModelImpl } from '../../read-models';

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
});
