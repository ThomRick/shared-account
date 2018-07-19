import { SharedAccountModelImpl } from './shared-account.model';
import { ISharedAccountModel, IExpend } from '../interfaces';

describe('SharedAccountModelImpl', () => {
  it('can be created', () => {
    const accountID = 'id';
    const owner = 'owner';
    const description = 'description';
    const sharedAccount: ISharedAccountModel = new SharedAccountModelImpl(accountID, owner, description);
    expect(sharedAccount.accountID).toEqual(accountID);
    expect(sharedAccount.owner).toEqual(owner);
    expect(sharedAccount.description).toEqual(description);
    expect(sharedAccount.amount).toEqual(0);
    expect(sharedAccount.users).toEqual([ owner ]);
    expect(sharedAccount.expends).toEqual([]);
  });

  it('should have a new user when add a user', () => {
    const accountID = 'id';
    const owner = 'owner';
    const description = 'description';
    const sharedAccount: ISharedAccountModel = new SharedAccountModelImpl(accountID, owner, description);
    sharedAccount.addUser('newUser');
    expect(sharedAccount.users).toContainEqual('newUser');
  });

  it('should have a new expend when add an expend', () => {
    const accountID = 'id';
    const owner = 'owner';
    const description = 'description';
    const sharedAccount: ISharedAccountModel = new SharedAccountModelImpl(accountID, owner, description);
    sharedAccount.addUser('newUser');
    const expend: IExpend = {
      amount: 100,
      owner,
      involvedUsers: [ owner, 'newUser' ],
    };
    sharedAccount.addExpend(expend);
    expect(sharedAccount.expends).toContainEqual(expend);
    expect(sharedAccount.amount).toEqual(expend.amount);
  });
});