import { IEventBase } from '../../events';

export interface IAggregateBase {
  readonly uncommittedChanges: IEventBase[];
  rebuild(events: IEventBase[]): IAggregateBase;
}
