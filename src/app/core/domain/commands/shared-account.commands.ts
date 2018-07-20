import { ICommand } from 'framework/commands';
import { Expend } from '../aggregates/models';

export enum SharedAccountCommandName {
  CREATE = 'CREATE_SHARED_ACCOUNT',
  ADD_USER = 'ADD_SHARED_ACCOUNT_USER',
  ADD_EXPEND = 'ADD_SHARED_ACCOUNT_EXPEND',
  CLOSE = 'CLOSE_SHARED_ACCOUNT',
}

export interface ISharedAccountCommandBase extends ICommand {}

export interface ICreateCommandPayload {
  owner: string;
  description: string;
}

export interface ICreateCommand extends ISharedAccountCommandBase {
  name: SharedAccountCommandName.CREATE;
  payload: ICreateCommandPayload;
}

export interface IAddUserCommandPayload {
  accountID: string;
  userID: string;
}

export interface IAddUserCommand extends ISharedAccountCommandBase {
  name: SharedAccountCommandName.ADD_USER;
  payload: IAddUserCommandPayload;
}

export interface IAddExpendCommandPayload {
  accountID: string;
  expend: Expend;
}

export interface IAddExpendCommand extends ISharedAccountCommandBase {
  name: SharedAccountCommandName.ADD_EXPEND;
  payload: IAddExpendCommandPayload;
}

export interface ICloseCommandPayload {
  accountID: string;
  reason: string;
}

export interface ICloseCommand extends ISharedAccountCommandBase {
  name: SharedAccountCommandName.CLOSE;
  payload: ICloseCommandPayload;
}

export type SharedAccountCommand =
  | ICreateCommand
  | IAddUserCommand
  | IAddExpendCommand
  | ICloseCommand;
