import { IReadModel } from '../../../../../framework/read-model';

export interface IExpend {
  amount: number;
  owner: string;
  involvedUsers: string[];
}

export interface ISharedAccountModel extends IReadModel {
  accountID: string;
  description: string;
  amount: number;
  owner: string;
  users: string[];
  expends: IExpend[];
  addUser(user: string): ISharedAccountModel;
  addExpend(expend: IExpend): ISharedAccountModel;
}
