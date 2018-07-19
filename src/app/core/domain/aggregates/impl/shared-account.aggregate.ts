import { AbstractAggregate } from '../../../../../framework/aggregates';
import { IEventBase } from '../../../../../framework/events';
import { ISharedAccountModel } from '../../read-models';
import { ISharedAccountAggregate } from '../interfaces';
import { SharedAccountEvent, SharedAccountEventType } from '../../events';
import { generateID } from '../../../../../framework/generators';

export class SharedAccountAggregateImpl extends AbstractAggregate implements ISharedAccountAggregate {
  protected _id: string;
  protected _model: ISharedAccountModel;

  public create(description: string, owner: string): ISharedAccountAggregate {
    const event: SharedAccountEvent = {
      type: SharedAccountEventType.CREATED,
      accountID: generateID(),
      owner,
      description,
    };
    this.apply(event);
    this.save(event);
    return this;
  }

  public addUser(userID: string): ISharedAccountAggregate {
    throw new Error('Method not implemented.');
  }

  public addExpend(amount: number): ISharedAccountAggregate {
    throw new Error('Method not implemented.');
  }

  public close(reason: string): ISharedAccountAggregate {
    throw new Error('Method not implemented.');
  }

  protected apply(event: IEventBase): SharedAccountAggregateImpl {
    switch (event.type) {
      case SharedAccountEventType.CREATED:
        this._id = event.accountID;
        this._model = {
          accountID: event.accountID,
          amount: 0,
          description: event.description,
          owner: event.owner,
        };
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
