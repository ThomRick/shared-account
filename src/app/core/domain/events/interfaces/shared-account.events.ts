import { IEventBase } from '../../../../../framework/events';
import { Expend } from '../../aggregates/models';

export interface ISharedAccountEventBase extends IEventBase {
  accountID: string;
}

export interface ISharedAccountCreatedEvent extends ISharedAccountEventBase {
  description: string;
  owner: string;
  type: 'SHARED_ACCOUNT_CREATED';
}

export interface ISharedAccountUserAddedEvent extends ISharedAccountEventBase {
  userID: string;
  type: 'SHARED_ACCOUNT_USER_ADDED';
}

export interface ISharedAccountExpendAddedEvent extends ISharedAccountEventBase {
  expend: Expend;
  type: 'SHARED_ACCOUNT_EXPEND_ADDED';
}

export interface ISharedAccountClosedEvent extends ISharedAccountEventBase {
  reason: string;
  type: 'SHARED_ACCOUNT_CLOSED';
}

export type SharedAccountEvent =
  | ISharedAccountCreatedEvent
  | ISharedAccountUserAddedEvent
  | ISharedAccountExpendAddedEvent
  | ISharedAccountClosedEvent;
