import { ISharedAccountClosedEvent, SharedAccountEventType } from '../interfaces';

export class SharedAccountClosed implements ISharedAccountClosedEvent {
  public readonly type = SharedAccountEventType.CLOSED;
  constructor(
    public readonly accountID: string,
    public readonly reason: string,
  ) {}
}
