import { ISharedAccountCreatedEvent } from '../interfaces';

export class SharedAccountCreated implements ISharedAccountCreatedEvent {
  public readonly type = 'SHARED_ACCOUNT_CREATED';
  constructor(
    public readonly accountID: string,
    public readonly owner: string,
    public readonly description: string,
  ) {}
}
