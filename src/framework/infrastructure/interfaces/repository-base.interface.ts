import { IAggregateBase } from '../../aggregates';

export interface IRepositoryBase<T extends IAggregateBase> {
  insert(aggregate: T): Promise<boolean>;
  findAll(): Promise<T[]>;
  find(query: (aggregate: T) => boolean): Promise<T>;
}