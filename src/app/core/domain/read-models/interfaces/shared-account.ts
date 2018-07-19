import { IReadModel } from '../../../../../framework/read-model';

export interface ISharedAccountModel extends IReadModel {
  accountID: string;
  description: string;
  amount: number;
  owner: string;
}
