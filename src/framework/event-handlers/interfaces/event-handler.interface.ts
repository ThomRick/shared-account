import { IEventBase } from '../../events';

export interface IEventHander<T extends IEventBase> {
  handle(event: T): Promise<void>;
}
