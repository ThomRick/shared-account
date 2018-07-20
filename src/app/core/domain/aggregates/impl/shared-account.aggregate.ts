import { AbstractAggregate } from '../../../../../framework/aggregates';
import { IEventBase } from '../../../../../framework/events';
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
import { Expend } from '../models';

export class SharedAccountAggregate extends AbstractAggregate implements ISharedAccountAggregate {
  protected _id: string;
  private _owner: string;
  private _description: string;
  private _users: string[];
  private _expends: Expend[];

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

  public addExpend(expend: Expend): ISharedAccountAggregate {
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

  protected apply(event: IEventBase): SharedAccountAggregate {
    switch (event.type) {
      case SharedAccountEventType.CREATED:
        this._id = event.accountID;
        this._owner = event.owner;
        this._description = event.description;
        this._users = [ event.owner ];
        this._expends = [];
        break;
      case SharedAccountEventType.USER_ADDED:
        this._users.push(event.userID);
        break;
      case SharedAccountEventType.EXPEND_ADDED:
        this._expends.push(event.expend);
        break;
      case SharedAccountEventType.CLOSED:
        break;
      default:
        throw new Error(`Can no manage event : ${ event.type }`);
    }
    return this;
  }

  protected empty(): SharedAccountAggregate {
    return new SharedAccountAggregate();
  }

  public get owner(): string {
    return this._owner;
  }

  public get description(): string {
    return this._description;
  }

  public get users(): string[] {
    return this._users;
  }

  public get expends(): Expend[] {
    return this._expends;
  }
}
