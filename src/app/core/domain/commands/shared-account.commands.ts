import { ICommandBase } from 'framework/commands';

export enum SharedAccountCommandName {
  CREATE = 'CREATE_SHARED_ACCOUNT',
  ADD_USER = 'ADD_SHARED_ACCOUNT_USER',
  ADD_EXPEND = 'ADD_SHARED_ACCOUNT_EXPEND',
  CLOSE = 'CLOSE_SHARED_ACCOUNT',
}

export interface ISharedAccountCommandBase extends ICommandBase {}

export interface ICreateCommand extends ISharedAccountCommandBase {
  name: SharedAccountCommandName.CREATE;
  payload: {
    owner: string;
    description: string;
  };
}

export interface IAddUserCommand extends ISharedAccountCommandBase {
  name: SharedAccountCommandName.ADD_USER;
  payload: {
    accountID: string;
    userID: string;
  };
}

export interface IAddExpendCommand extends ISharedAccountCommandBase {
  name: SharedAccountCommandName.ADD_EXPEND;
  payload: {
    accountID: string;
    involvedUsers: string[];
    amount: number;
  };
}

export interface ICloseCommand extends ISharedAccountCommandBase {
  name: SharedAccountCommandName.CLOSE;
  payload: {
    accountID: string;
    reason: string;
  };
}

export type SharedAccountCommand =
  | ICreateCommand
  | IAddUserCommand
  | IAddExpendCommand
  | ICloseCommand;
