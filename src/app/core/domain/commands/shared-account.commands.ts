import { ICommand } from 'framework/commands';
import { Expend } from '../aggregates/models';

export interface ISharedAccountCommandBase extends ICommand {}

export interface ICreateCommandPayload {
  owner: string;
  description: string;
}

export interface ICreateCommand extends ISharedAccountCommandBase {
  name: 'CREATE_SHARED_ACCOUNT';
  payload: ICreateCommandPayload;
}

export interface IAddUserCommandPayload {
  accountID: string;
  userID: string;
}

export interface IAddUserCommand extends ISharedAccountCommandBase {
  name: 'ADD_SHARED_ACCOUNT_USER';
  payload: IAddUserCommandPayload;
}

export interface IAddExpendCommandPayload {
  accountID: string;
  expend: Expend;
}

export interface IAddExpendCommand extends ISharedAccountCommandBase {
  name: 'ADD_SHARED_ACCOUNT_EXPEND';
  payload: IAddExpendCommandPayload;
}

export interface ICloseCommandPayload {
  accountID: string;
  reason: string;
}

export interface ICloseCommand extends ISharedAccountCommandBase {
  name: 'CLOSE_SHARED_ACCOUNT';
  payload: ICloseCommandPayload;
}

export type SharedAccountCommand =
  | ICreateCommand
  | IAddUserCommand
  | IAddExpendCommand
  | ICloseCommand;
