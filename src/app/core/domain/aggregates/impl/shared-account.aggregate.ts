import { AbstractAggregate } from '../../../../../framework/aggregates';
import { IEventBase } from '../../../../../framework/events';
import { ISharedAccountModel, SharedAccountModelImpl, IExpend } from '../../read-models';
import { ISharedAccountAggregate } from '../interfaces';
import {
  SharedAccountEvent,
  SharedAccountEventType,
  SharedAccountCreated,
  SharedAccountUserAdded,
  SharedAccountExpendAdded,
  SharedAccountClosed,
} from '../../events';
import { generateID } from '../../../../../framework/generators';

export class SharedAccountAggregateImpl extends AbstractAggregate implements ISharedAccountAggregate {
  protected _id: string;
  protected _model: ISharedAccountModel;

  public create(description: string, owner: string): ISharedAccountAggregate {
    const event: SharedAccountEvent = new SharedAccountCreated(generateID(), owner, description);
    this.apply(event);
    this.save(event);
    return this;
  }

  public addUser(userID: string): ISharedAccountAggregate {
    const event: SharedAccountEvent = new SharedAccountUserAdded(this._id, userID);
    this.apply(event);
    this.save(event);
    return this;
  }

  public addExpend(expend: IExpend): ISharedAccountAggregate {
    const event: SharedAccountEvent = new SharedAccountExpendAdded(this._id, expend);
    this.apply(event);
    this.save(event);
    return this;
  }

  public close(reason: string): ISharedAccountAggregate {
    const event: SharedAccountEvent = new SharedAccountClosed(this._id, reason);
    this.apply(event);
    this.save(event);
    return this;
  }

  protected apply(event: IEventBase): SharedAccountAggregateImpl {
    switch (event.type) {
      case SharedAccountEventType.CREATED:
        this._id = event.accountID;
        this._model = new SharedAccountModelImpl(event.accountID, event.owner, event.description);
        break;
      case SharedAccountEventType.USER_ADDED:
        this._model.addUser(event.userID);
        break;
      case SharedAccountEventType.EXPEND_ADDED:
        this._model.addExpend(event.expend);
        break;
      case SharedAccountEventType.CLOSED:
        this._model = null;
        break;
      default:
        throw new Error(`Can no manage event : ${ event.type }`);
    }
    return this;
  }

  protected empty(): SharedAccountAggregateImpl {
    return new SharedAccountAggregateImpl();
  }
}
