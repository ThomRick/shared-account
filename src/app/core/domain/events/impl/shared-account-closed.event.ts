import { ISharedAccountClosedEvent } from '../interfaces';

export class SharedAccountClosed implements ISharedAccountClosedEvent {
  public readonly type = 'SHARED_ACCOUNT_CLOSED';
  constructor(
    public readonly accountID: string,
    public readonly reason: string,
  ) {}
}
