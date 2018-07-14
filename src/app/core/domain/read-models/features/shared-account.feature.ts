import { IUserModel, IOperationModel } from '../interfaces';

export interface ISharedAccountFeature {
  addUser(user: IUserModel): void;
  addOperation(operation: IOperationModel): void;
}
