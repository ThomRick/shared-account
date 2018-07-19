import { ISharedAccountUserAddedEvent, SharedAccountEventType } from '../interfaces';

export class SharedAccountUserAdded implements ISharedAccountUserAddedEvent {
  public readonly type = SharedAccountEventType.USER_ADDED;
  constructor(
    public readonly accountID: string,
    public readonly userID: string,
  ) {}
}
