import { IReadModel } from '../../../../../framework/read-model';
import { Expend } from '../../aggregates/models';

export interface ISharedAccountModel extends IReadModel {
  accountID: string;
  description: string;
  owner: string;
  users: string[];
  expends: Expend[];
}
