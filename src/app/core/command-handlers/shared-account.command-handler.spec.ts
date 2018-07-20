import { ICommandHandler } from '../../../framework/command-handlers';
import { SharedAccountCommand } from '../domain/commands';
import { SharedAccountCommandHandler } from './shared-account.command-handler';
import { IRepository, InMemoryRepository } from '../../../framework/infrastructure';
import { IDocument } from '../../../framework/infrastructure/interfaces';
import { SharedAccountAggregate } from '../domain/aggregates/impl';

describe('Shared Account Command Handler', () => {
  let collection: Map<string, IDocument>;
  let repository: IRepository<SharedAccountAggregate>;
  let handler: ICommandHandler<SharedAccountCommand>;

  let insertSpy;
  let findSpy;
  beforeEach(() => {
    collection = new Map<string, IDocument>();
    repository = new InMemoryRepository(collection);
    insertSpy = spyOn(repository, 'insert').and.callThrough();
    findSpy = spyOn(repository, 'find').and.callThrough();
    handler = new SharedAccountCommandHandler(repository);
  });

  it('should handle create command', async () => {
    const command: SharedAccountCommand = {
      name: 'CREATE_SHARED_ACCOUNT',
      payload: {
        owner: 'owner',
        description: 'description',
      },
    };
    await handler.handle(command);
    expect(insertSpy).toHaveBeenCalled();
  });

  it('should handle add user command', async () => {
    collection.set('id', {
      _id: 'id',
      events: [
        {
          type: 'SHARED_ACCOUNT_CREATED',
          accountID: 'id',
          description: 'description',
          owner: 'owner',
        },
      ],
    });
    const command: SharedAccountCommand = {
      name: 'ADD_SHARED_ACCOUNT_USER',
      payload: {
        accountID: 'id',
        userID: 'userID',
      },
    };
    await handler.handle(command);
    expect(findSpy).toHaveBeenCalled();
    expect(insertSpy).toHaveBeenCalled();
  });

  it('should handle add expend command', async () => {
    collection.set('id', {
      _id: 'id',
      events: [
        {
          type: 'SHARED_ACCOUNT_CREATED',
          accountID: 'id',
          description: 'description',
          owner: 'owner',
        },
        {
          type: 'SHARED_ACCOUNT_USER_ADDED',
          accountID: 'id',
          userID: 'userID',
        },
      ],
    });
    const command: SharedAccountCommand = {
      name: 'ADD_SHARED_ACCOUNT_EXPEND',
      payload: {
        accountID: 'id',
        expend: {
          owner: 'userID',
          involvedUsers: [ 'owner', 'userID' ],
          amount: 100,
        },
      },
    };
    await handler.handle(command);
    expect(findSpy).toHaveBeenCalled();
    expect(insertSpy).toHaveBeenCalled();
  });
});
