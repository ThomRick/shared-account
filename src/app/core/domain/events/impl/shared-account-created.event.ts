import { ISharedAccountCreatedEvent, SharedAccountEventType } from '../interfaces';

export class SharedAccountCreated implements ISharedAccountCreatedEvent {
  public readonly type = SharedAccountEventType.CREATED;
  constructor(
    public readonly accountID: string,
    public readonly owner: string,
    public readonly description: string,
  ) {}
}
