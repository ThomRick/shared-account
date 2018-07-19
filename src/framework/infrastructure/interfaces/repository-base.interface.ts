import { IEventBase } from '../../events';

export interface IRepositoryBase {
  insert(key: string, events: IEventBase[]): Promise<void>;
  find(): Promise<void>;
}