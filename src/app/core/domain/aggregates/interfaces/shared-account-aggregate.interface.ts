import { IExpend } from '../../read-models';

export interface ISharedAccountAggregate {
  create(description: string, owner: string): ISharedAccountAggregate;
  addUser(userID: string): ISharedAccountAggregate;
  addExpend(expend: IExpend): ISharedAccountAggregate;
  close(reason: string): ISharedAccountAggregate;
}