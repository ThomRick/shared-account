import { IBankAccountWithdrawMade, BankAccountEventType } from '../interfaces/bank-account.events';

export class BankAccountWithdrawMade implements IBankAccountWithdrawMade {
  public readonly type = BankAccountEventType.ACCOUNT_WITHDRAW_MADE;
  constructor(
    public readonly accountId: string,
    public readonly amount: number,
  ) {}
}
