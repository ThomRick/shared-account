import { IAggregate } from '../../aggregates';

export interface IQueryHandler<T extends IAggregate> {
  handle(id?: string): Promise<T | T[]>;
}
