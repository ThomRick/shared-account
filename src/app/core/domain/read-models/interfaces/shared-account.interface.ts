import { IUserModel } from './user.interface';
import { IOperationModel } from './operation.interface';

export interface ISharedAccountModel {
  readonly id: string;
  readonly description: string;
  readonly users: IUserModel[];
  readonly operations: IOperationModel[];
}
