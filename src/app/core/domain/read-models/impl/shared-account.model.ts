import { ISharedAccountModel, IExpend } from '../interfaces';

export class SharedAccountModelImpl implements ISharedAccountModel {
  private _accountID: string;
  private _owner: string;
  private _description: string;
  private _users: string[];
  private _expends: IExpend[];

  constructor(accountID, owner, description) {
    this._accountID = accountID;
    this._owner = owner;
    this._description = description;
    this._users = [ owner ];
    this._expends = [];
  }

  public addUser(user: string): SharedAccountModelImpl {
    this._users.push(user);
    return this;
  }

  public addExpend(expend: IExpend): SharedAccountModelImpl {
    this._expends.push(expend);
    return this;
  }

  public get accountID(): string {
    return this._accountID;
  }

  public get owner(): string {
    return this._owner;
  }

  public get description(): string {
    return this._description;
  }

  public get amount(): number {
    return this._expends.reduce<number>(
      (amount: number, expend: IExpend) => amount += expend.amount, 0,
    );
  }

  public get users(): string[] {
    return this._users;
  }

  public get expends(): IExpend[] {
    return this._expends;
  }
}