import { ICommandHandler } from '../../../framework/command-handlers';
import { SharedAccountCommand, SharedAccountCommandName } from '../domain/commands';
import { SharedAccountCommandHandler } from './shared-account.command-handler';
import { IRepository, InMemoryRepository } from '../../../framework/infrastructure';

jest.mock('../../../framework/infrastructure/impl/in-memory.repository');

describe('Shared Account Command Handler', () => {
  let repository: IRepository;
  let handler: ICommandHandler<SharedAccountCommand>;

  beforeEach(() => {
    repository = new InMemoryRepository();
    handler = new SharedAccountCommandHandler(repository);
  });

  it('should handle create command', async () => {
    const command: SharedAccountCommand = {
      name: SharedAccountCommandName.CREATE,
      payload: {
        owner: 'owner',
        description: 'description',
      },
    };
    await handler.handle(command);
    expect(repository.insert).toHaveBeenCalled();
  });

  xit('should handle add user command', async () => {
    const command: SharedAccountCommand = {
      name: SharedAccountCommandName.ADD_USER,
      payload: {
        accountID: 'id',
        userID: 'userID',
      },
    };
    await handler.handle(command);
    expect(repository.find).toHaveBeenCalled();
    expect(repository.insert).toHaveBeenCalled();
  });
});
