import { IEventBase } from '../../events';

export interface IAggregate {
  readonly uncommittedChanges: IEventBase[];
  rebuild(events: IEventBase[]): IAggregate;
}
