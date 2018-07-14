import { IBankAccountDepositMade, BankAccountEventType } from '../interfaces/bank-account.events';

export class BankAccountDepositMade implements IBankAccountDepositMade {
  public readonly type = BankAccountEventType.ACCOUNT_DEPOSIT_MADE;
  constructor(
    public readonly accountId: string,
    public readonly amount: number,
  ) {}
}
