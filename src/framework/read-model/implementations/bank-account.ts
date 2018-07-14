import { IReadModel } from '../interfaces';

export class BankAccount implements IReadModel {
  constructor(
    public readonly id: string,
    public readonly owner: string,
    private _balance: number = 0,
  ) {}

  public increment(amount: number): number {
    return this._balance += amount;
  }

  public decrement(amount: number): number {
    return this._balance -= amount;
  }

  public get balance(): number {
    return this._balance;
  }
}
