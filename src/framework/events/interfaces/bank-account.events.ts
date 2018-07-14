import { IEventBase } from './event-base.interface';

export enum BankAccountEventType {
  ACCOUNT_CREATED = 'ACCOUNT_CREATED',
  ACCOUNT_DEPOSIT_MADE = 'ACCOUNT_DEPOSIT_MADE',
  ACCOUNT_WITHDRAW_MADE = 'ACCOUNT_WITHDRAW_MADE',
  ACCOUNT_CLOSED = 'ACCOUNT_CLOSED',
}

export interface IBankAccountEventBase extends IEventBase {
  accountId: string;
}

export interface IBankAccountCreated extends IBankAccountEventBase {
  type: BankAccountEventType.ACCOUNT_CREATED;
  owner: string;
}

export interface IBankAccountDepositMade extends IBankAccountEventBase {
  type: BankAccountEventType.ACCOUNT_DEPOSIT_MADE;
  amount: number;
}

export interface IBankAccountWithdrawMade extends IBankAccountEventBase {
  type: BankAccountEventType.ACCOUNT_WITHDRAW_MADE;
  amount: number;
}

export interface IBankAccountClosed extends IBankAccountEventBase {
  type: BankAccountEventType.ACCOUNT_CLOSED;
  reason: string;
}

export type BankAccountEvent =
  | IBankAccountCreated
  | IBankAccountDepositMade
  | IBankAccountWithdrawMade
  | IBankAccountClosed;
