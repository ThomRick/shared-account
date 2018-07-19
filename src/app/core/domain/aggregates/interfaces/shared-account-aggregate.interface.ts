export interface ISharedAccountAggregate {
  create(description: string, owner: string): ISharedAccountAggregate;
  addUser(userID: string): ISharedAccountAggregate;
  addExpend(amount: number): ISharedAccountAggregate;
  close(reason: string): ISharedAccountAggregate;
}