import { IEventBase } from '../../../../../framework/events';

export enum SharedAccountEventType {
  CREATED = 'SHARED_ACCOUNT_CREATED',
  CLOSED = 'SHARED_ACCOUNT_CLOSED',
  USER_ADDED = 'SHARED_ACCOUNT_USER_ADDED',
  EXPEND_MADE = 'SHARED_ACCOUNT_EXPEND_MADE',
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

export interface ISharedAccountExpendMadeEvent extends ISharedAccountEventBase {
  userID: string;
  involvedUsers: string[];
  amount: number;
  type: SharedAccountEventType.EXPEND_MADE;
}

export interface ISharedAccountClosedEvent extends ISharedAccountEventBase {
  reason: string;
  type: SharedAccountEventType.CLOSED;
}

export type SharedAccountEvent =
  | ISharedAccountCreatedEvent
  | ISharedAccountUserAddedEvent
  | ISharedAccountClosedEvent;
