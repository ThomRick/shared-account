import { SharedAccountImpl } from './shared-account.implementation';
import { IUserModel, IOperationModel } from '../interfaces';

describe('Shared Account Implementation', () => {
  it('should have a new user when add a user', () => {
    const account = new SharedAccountImpl('id', 'description');
    const user: IUserModel = {
      id: 'userId',
    };
    account.addUser(user);
    expect(account.users).toContainEqual(user);
    expect(account.operations.length).toEqual(0);
    expect(account.amount).toEqual(0);
  });

  it('should have a new operation and a balance equal to the operation when add operation', () => {
    const account = new SharedAccountImpl('id', 'description');
    const operation: IOperationModel = {
      amount: 100,
    };
    account.addOperation(operation);
    expect(account.operations).toContainEqual(operation);
    expect(account.amount).toEqual(operation.amount);
  });
});
