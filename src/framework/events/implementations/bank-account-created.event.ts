import { IBankAccountCreated, BankAccountEventType } from '../interfaces/bank-account.events';

export class BankAccountCreated implements IBankAccountCreated {
  public readonly type = BankAccountEventType.ACCOUNT_CREATED;
  constructor(
    public readonly accountId: string,
    public readonly owner: string,
  ) {}
}
