import { ICommandHandler } from '../../../framework/command-handlers';
import { IRepository } from '../../../framework/infrastructure';
import { InMemoryRepository } from '../../../framework/infrastructure';
import { SharedAccountCommand, SharedAccountCommandName } from '../domain/commands';
import { SharedAccountAggregateImpl } from '../domain/aggregates/impl';
import { IEventBase } from 'framework/events';

export class SharedAccountCommandHandler implements ICommandHandler<SharedAccountCommand> {
  constructor(
    private readonly repository: IRepository = new InMemoryRepository(),
  ) {}

  public async handle(command: SharedAccountCommand): Promise<void> {
    const aggregate = new SharedAccountAggregateImpl();
    switch (command.name) {
      case SharedAccountCommandName.CREATE:
        aggregate.create(command.payload.description, command.payload.owner);
        await this.repository.insert(aggregate.id, aggregate.uncommittedChanges);
        break;
      case SharedAccountCommandName.ADD_USER:
        await this.repository.find(command.payload.accountID, (events: IEventBase[]) => aggregate.rebuild(events));
        aggregate.addUser(command.payload.userID);
        await this.repository.insert(aggregate.id, aggregate.uncommittedChanges);
        break;
      default:
        throw new Error(`Can no handle command : ${ command.name}`);
    }
  }
}
