export interface IBankAccount {
  create(owner: string, firstDepositAmount: number): IBankAccount;
  deposit(amount: number): IBankAccount;
  withdraw(amount: number): IBankAccount;
  close(): IBankAccount;
}
