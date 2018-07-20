import { IEventBase } from '../../events';
import { IReadModel } from '../../read-model';

export interface IAggregate {
  readonly uncommittedChanges: IEventBase[];
  readonly [key: string]: any;
  rebuild(events: IEventBase[]): IAggregate;
  map<T extends IReadModel>(actor: (aggregate: IAggregate) => T): T;
}
