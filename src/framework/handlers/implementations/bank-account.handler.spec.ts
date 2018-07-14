import { IHandler } from '../interfaces';
import { BankAccountPayload, BankAccountPayloadType } from '../../payloads';
import { BankAccount } from '../../read-model';
import { BankAccountHandler } from './bank-account.handler';
import { IRepositoryBase } from '../../infrastructure';
import { BankAccountAggregate } from '../../aggregates/implementations/bank-account.aggregate';
import { InMemoryRepository } from '../../infrastructure/implementations/in-memory-repository';

describe('Bank Account Handler', () => {
  const owner = 'owner';
  let handler: IHandler<BankAccountPayload, BankAccount>;
  let repository: IRepositoryBase<BankAccountAggregate>;

  beforeEach(() => {
    repository = new InMemoryRepository(BankAccountAggregate);
    handler = new BankAccountHandler(repository);
  });

  const createOwnerAccount = async (): Promise<BankAccount> => {
    const payload: BankAccountPayload = {
      type: BankAccountPayloadType.CREATE,
      data: {
        owner,
        firstDepositAmount: 0,
      },
    };
    return await handler.handle(payload);
  };

  it('should create a new bank account', async () => {
    const account = await createOwnerAccount();
    expect(account.id).toBeDefined();
    expect(account.owner).toEqual('owner');
    expect(account.balance).toEqual(0);
  });

  it('should throw an error when create an account with the same owner', async () => {
    await createOwnerAccount();
    try {
      await createOwnerAccount();
    } catch (error) {
      expect(error.message).toEqual('Account with owner "owner" already exist.');
    }
  });

  it('should make a deposit to the bank account', async () => {
    let account = await createOwnerAccount();
    const depositPayload: BankAccountPayload = {
      type: BankAccountPayloadType.DEPOSIT,
      data: {
        id: account.id,
        amount: 100,
      },
    };
    account = await handler.handle(depositPayload);
    expect(account.balance).toEqual(100);
  });
});
