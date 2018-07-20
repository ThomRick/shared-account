import { IEventBase } from '../../events';
import { IAggregate } from '../../aggregates';

export interface IRepository<T extends IAggregate> {
  insert(key: string, events: IEventBase[]): Promise<void>;
  find(process: (events: IEventBase[]) => T): Promise<T | T[]>;
  find(key: string, process: (events: IEventBase[]) => T): Promise<T | T[]>;
}