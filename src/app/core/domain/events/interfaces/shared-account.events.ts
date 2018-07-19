import { IEventBase } from '../../../../../framework/events';

export enum SharedAccountEventType {
  CREATED = 'SHARED_ACCOUNT_CREATED',
  CLOSED = 'SHARED_ACCOUNT_CLOSED',
  USER_JOINED = 'SHARED_ACCOUNT_USER_JOINED',
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

export interface ISharedAccountUserJoinedEvent extends ISharedAccountEventBase {
  userID: string;
  type: SharedAccountEventType.USER_JOINED;
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
  | ISharedAccountClosedEvent;
