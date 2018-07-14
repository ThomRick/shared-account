import { IUserModel } from './user.interface';
import { IOperationModel } from './operation.interface';
import { IReadModel } from '../../../../../framework/read-model';

export interface ISharedAccountModel extends IReadModel {
  readonly id: string;
  readonly description: string;
  readonly users: IUserModel[];
  readonly operations: IOperationModel[];
  readonly amount: number;
}
