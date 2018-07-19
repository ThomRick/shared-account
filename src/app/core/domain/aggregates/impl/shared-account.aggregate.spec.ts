import { SharedAccountAggregateImpl } from './shared-account.aggregate';
import { SharedAccountEventType } from '../../events';

describe('Shared Account Aggregate', () => {
  it('should have a SharedAccountCreated event when create a new SharedAccount', () => {
    const description: string = 'description';
    const owner: string = 'owner';
    const aggregate = new SharedAccountAggregateImpl();
    aggregate.create(description, owner);
    expect(aggregate.uncommittedChanges).toContainEqual({
      accountID: aggregate.id,
      description,
      owner,
      type: SharedAccountEventType.CREATED,
    });
    expect(aggregate.model).toEqual({
      accountID: aggregate.id,
      amount: 0,
      description,
      owner,
    });
  });
});
