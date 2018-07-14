import { BankAccountAggregate } from './bank-account.aggregate';
import { BankAccountCreated, BankAccountDepositMade, BankAccountWithdrawMade, BankAccountEvent } from '../../events';
import { generateID } from '../../generators';

describe('Bank Account Aggregate', () => {
  it('should have an AccountCreated event when create a new account', () => {
    const owner = 'owner';
    const firstDepositAmount = 0;
    const aggregate = new BankAccountAggregate();
    aggregate.create(owner, firstDepositAmount);
    expect(aggregate.uncommittedChanges).toContainEqual(
      new BankAccountCreated(aggregate.id, owner),
    );
  });

  it('should have an AccountDepositMade event when deposit', () => {
    const owner = 'owner';
    const amount = 100;
    const aggregate = new BankAccountAggregate();
    aggregate.create(owner);
    aggregate.deposit(amount);
    expect(aggregate.uncommittedChanges).toContainEqual(
      new BankAccountDepositMade(aggregate.id, amount),
    );
    expect(aggregate.model.balance).toEqual(amount);
  });

  it('should have an AccountWithdrawMade event when withdraw', () => {
    const owner = 'owner';
    const firstDepositAmount = 200;
    const amount = 100;
    const aggregate = new BankAccountAggregate();
    aggregate.create(owner, firstDepositAmount);
    aggregate.withdraw(amount);
    expect(aggregate.uncommittedChanges).toContainEqual(
      new BankAccountWithdrawMade(aggregate.id, amount),
    );
    expect(aggregate.model.balance).toEqual(firstDepositAmount - amount);
  });

  it('should rebuild the aggregate from the events', () => {
    const id: string = generateID();
    const owner = 'owner';
    const events: BankAccountEvent[] = [
      new BankAccountCreated(id, owner),
      new BankAccountDepositMade(id, 100),
      new BankAccountWithdrawMade(id, 50),
      new BankAccountDepositMade(id, 100),
      new BankAccountWithdrawMade(id, 50),
    ];
    const aggregate = new BankAccountAggregate().rebuild(events) as BankAccountAggregate;
    expect(aggregate.uncommittedChanges.length).toEqual(0);
    expect(aggregate.model.id).toEqual(id);
    expect(aggregate.model.owner).toEqual(owner);
    expect(aggregate.model.balance).toEqual(100);
  });
});
