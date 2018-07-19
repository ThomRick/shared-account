import { AbstractAggregate } from '../../../../../framework/aggregates';
import { IEventBase } from '../../../../../framework/events';
import { ISharedAccountModel, SharedAccountModelImpl, IExpend } from '../../read-models';
import { ISharedAccountAggregate } from '../interfaces';
import { SharedAccountEvent, SharedAccountEventType, SharedAccountCreated, SharedAccountUserAdded, SharedAccountExpendAdded } from '../../events';
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
    throw new Error('Method not implemented.');
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
        this.model.addExpend(event.expend);
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
