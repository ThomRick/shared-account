import { IBankAccount } from '../interfaces/bank-account.interface';
import { AbstractAggregate } from './abstract-aggregate';
import { BankAccount } from '../../read-model';
import {
  BankAccountEvent,
  BankAccountCreated,
  BankAccountDepositMade,
  BankAccountWithdrawMade,
  BankAccountEventType,
} from '../../events';
import { generateID } from '../../generators';

export class BankAccountAggregate extends AbstractAggregate implements IBankAccount {
  protected _id: string;
  protected _model: BankAccount;

  public create(owner: string, firstDepositAmount: number = 0): BankAccountAggregate {
    const event: BankAccountEvent = new BankAccountCreated(generateID(), owner);
    this.apply(event);
    this.save(event);
    return firstDepositAmount !== 0 ? this.deposit(firstDepositAmount) : this;
  }

  public deposit(amount: number): BankAccountAggregate {
    const event: BankAccountEvent = new BankAccountDepositMade(this._id, amount);
    this.apply(event);
    this.save(event);
    return this;
  }

  public withdraw(amount: number): BankAccountAggregate {
    const event: BankAccountEvent = new BankAccountWithdrawMade(this._id, amount);
    this.apply(event);
    this.save(event);
    return this;
  }

  public close(): BankAccountAggregate {
    throw new Error('Method not implemented.');
  }

  protected apply(event: BankAccountEvent): BankAccountAggregate {
    switch (event.type) {
      case BankAccountEventType.ACCOUNT_CREATED:
        this._id = event.accountId;
        this._model = new BankAccount(event.accountId, event.owner);
        break;
      case BankAccountEventType.ACCOUNT_DEPOSIT_MADE:
        this._model.increment(event.amount);
        break;
      case BankAccountEventType.ACCOUNT_WITHDRAW_MADE:
        this._model.decrement(event.amount);
        break;
      default:
        throw new Error(`Can not manage event type : ${ event.type }`);
    }
    return this;
  }

  protected empty(): BankAccountAggregate {
    return new BankAccountAggregate();
  }
}
