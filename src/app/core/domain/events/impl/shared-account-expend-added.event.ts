import { ISharedAccountExpendAddedEvent, SharedAccountEventType } from '../interfaces';
import { Expend } from '../../aggregates/models';

export class SharedAccountExpendAdded implements ISharedAccountExpendAddedEvent {
  public readonly type = SharedAccountEventType.EXPEND_ADDED;

  constructor(
    public readonly accountID: string,
    public readonly expend: Expend,
  ) {}
}
