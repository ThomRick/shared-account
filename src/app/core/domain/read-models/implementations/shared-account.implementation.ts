import { ISharedAccountModel, IUserModel, IOperationModel } from '../interfaces';
import { ISharedAccountFeature } from '../features';

export class SharedAccountImpl implements ISharedAccountModel, ISharedAccountFeature {
  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly users: IUserModel[] = [],
    public readonly operations: IOperationModel[] = [],
    private _amount: number = 0,
  ) {}

  public get amount(): number {
    return this._amount;
  }

  public addUser(user: IUserModel): void {
    this.users.push(user);
  }

  public addOperation(operation: IOperationModel): void {
    this.operations.push(operation);
    this._amount += operation.amount;
  }
}
