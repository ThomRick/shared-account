import { IHandler } from '../interfaces';
import { BankAccountPayload, BankAccountPayloadType, IOpen, IDeposit } from '../../payloads';
import { BankAccount } from '../../read-model';
import { IRepositoryBase } from '../../infrastructure';
import { BankAccountAggregate } from '../../aggregates/implementations/bank-account.aggregate';
import { InMemoryRepository } from '../../infrastructure/implementations/in-memory-repository';

export class BankAccountHandler implements IHandler<BankAccountPayload, BankAccount> {
  constructor(
    private readonly repository: IRepositoryBase<BankAccountAggregate> = new InMemoryRepository(BankAccountAggregate),
  ) {}

  public async handle(payload: BankAccountPayload): Promise<BankAccount> {
    switch (payload.type) {
      case BankAccountPayloadType.CREATE:
        return this.handleCreate(payload);
      case BankAccountPayloadType.DEPOSIT:
        return this.handleDeposit(payload);
      default:
        throw new Error(`Can not manage payload type : ${ payload.type }`);
    }
  }

  private async handleCreate(payload: IOpen): Promise<BankAccount> {
    let aggregate = await this.repository.find((account) => account.model.owner === payload.data.owner);
    if (!!aggregate) {
      throw new Error(`Account with owner "${ payload.data.owner }" already exist.`);
    }
    aggregate = new BankAccountAggregate().create(payload.data.owner, payload.data.firstDepositAmount);
    await this.repository.insert(aggregate);
    return aggregate.model as BankAccount;
  }

  private async handleDeposit(payload: IDeposit): Promise<BankAccount> {
    const aggregate = await this.repository.find((account) => account.id === payload.data.id);
    aggregate.deposit(payload.data.amount);
    return aggregate.model as BankAccount;
  }
}