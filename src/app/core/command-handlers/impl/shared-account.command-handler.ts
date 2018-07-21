import { ICommandHandler } from '../../../../framework/command-handlers';
import { IRepository } from '../../../../framework/infrastructure';
import { InMemoryRepository } from '../../../../framework/infrastructure';
import {
  SharedAccountCommand,
  ICreateCommandPayload,
  IAddUserCommandPayload,
  IAddExpendCommandPayload,
} from '../../domain/commands';
import { SharedAccountAggregate } from '../../domain/aggregates/impl';
import { IEventBase } from '../../../../framework/events';

export class SharedAccountCommandHandler implements ICommandHandler<SharedAccountCommand> {
  constructor(
    private readonly repository: IRepository<SharedAccountAggregate> = new InMemoryRepository(),
  ) {}

  public async handle(command: SharedAccountCommand): Promise<void> {
    switch (command.name) {
      case 'CREATE_SHARED_ACCOUNT':
        await this.handleCreateCommand(command.payload);
        break;
      case 'ADD_SHARED_ACCOUNT_USER':
        await this.handleAddUserCommand(command.payload);
        break;
      case 'ADD_SHARED_ACCOUNT_EXPEND':
        await this.handleAddExpendCommand(command.payload);
        break;
      default:
        throw new Error(`Can not handle command : ${ command.name}`);
    }
  }

  private async handleCreateCommand(payload: ICreateCommandPayload): Promise<void> {
    const aggregate = new SharedAccountAggregate();
    aggregate.create(payload.description, payload.owner);
    await this.repository.insert(aggregate.id, aggregate.uncommittedChanges);
  }

  private async handleAddUserCommand(payload: IAddUserCommandPayload): Promise<void> {
    const aggregate: SharedAccountAggregate = await this.repository.find(
      payload.accountID,
      (events: IEventBase[]): SharedAccountAggregate => this.rebuildProcess(events),
    ) as SharedAccountAggregate;
    aggregate.addUser(payload.userID);
    await this.repository.insert(aggregate.id, aggregate.uncommittedChanges);
  }

  private async handleAddExpendCommand(payload: IAddExpendCommandPayload): Promise<void> {
    const aggregate: SharedAccountAggregate = await this.repository.find(
      payload.accountID,
      (events: IEventBase[]) => this.rebuildProcess(events),
    ) as SharedAccountAggregate;
    aggregate.addExpend(payload.expend);
    await this.repository.insert(aggregate.id, aggregate.uncommittedChanges);
  }

  private rebuildProcess(events: IEventBase[]): SharedAccountAggregate {
    return new SharedAccountAggregate().rebuild(events) as SharedAccountAggregate;
  }
}
