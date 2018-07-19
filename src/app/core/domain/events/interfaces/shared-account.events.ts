import { IEventBase } from '../../../../../framework/events';
import { IExpend } from '../../read-models';

export enum SharedAccountEventType {
  CREATED = 'SHARED_ACCOUNT_CREATED',
  CLOSED = 'SHARED_ACCOUNT_CLOSED',
  USER_ADDED = 'SHARED_ACCOUNT_USER_ADDED',
  EXPEND_ADDED = 'SHARED_ACCOUNT_EXPEND_ADDED',
}

export interface ISharedAccountEventBase extends IEventBase {
  accountID: string;
}

export interface ISharedAccountCreatedEvent extends ISharedAccountEventBase {
  description: string;
  owner: string;
  type: SharedAccountEventType.CREATED;
}

export interface ISharedAccountUserAddedEvent extends ISharedAccountEventBase {
  userID: string;
  type: SharedAccountEventType.USER_ADDED;
}

export interface ISharedAccountExpendAddedEvent extends ISharedAccountEventBase {
  expend: IExpend;
  type: SharedAccountEventType.EXPEND_ADDED;
}

export interface ISharedAccountClosedEvent extends ISharedAccountEventBase {
  reason: string;
  type: SharedAccountEventType.CLOSED;
}

export type SharedAccountEvent =
  | ISharedAccountCreatedEvent
  | ISharedAccountUserAddedEvent
  | ISharedAccountExpendAddedEvent
  | ISharedAccountClosedEvent;
