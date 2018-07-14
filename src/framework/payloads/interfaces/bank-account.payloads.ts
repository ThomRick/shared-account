import { IPayload } from './payload.interface';

export enum BankAccountPayloadType {
  CREATE = 'CREATE_BANK_ACCOUNT',
  DEPOSIT = 'BANK_ACCOUNT_DEPOSIT',
  WITHDRAW = 'BANK_ACCOUNT_WITHDRAW',
  CLOSE = 'CLOSE_BANK_ACCOUNT',
}

export interface IBankAccountPayloadBase extends IPayload {}

export interface IOpen extends IBankAccountPayloadBase {
  type: BankAccountPayloadType.CREATE;
  data: {
    owner: string,
    firstDepositAmount?: number,
  };
}

export interface IDeposit extends IBankAccountPayloadBase {
  type: BankAccountPayloadType.DEPOSIT;
  data: {
    id: string,
    amount: number,
  };
}

export interface IWithdraw extends IBankAccountPayloadBase {
  type: BankAccountPayloadType.WITHDRAW;
  data: {
    id: string,
    amount: number,
  };
}

export interface IClose extends IBankAccountPayloadBase {
  type: BankAccountPayloadType.CLOSE;
  data: {
    id: string,
    reason: string,
  };
}

export type BankAccountPayload =
  | IOpen
  | IDeposit
  | IWithdraw
  | IClose;