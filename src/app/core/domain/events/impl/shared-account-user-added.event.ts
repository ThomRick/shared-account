import { ISharedAccountUserAddedEvent } from '../interfaces';

export class SharedAccountUserAdded implements ISharedAccountUserAddedEvent {
  public readonly type = 'SHARED_ACCOUNT_USER_ADDED';
  constructor(
    public readonly accountID: string,
    public readonly userID: string,
  ) {}
}
