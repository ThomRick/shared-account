import { IEventBase } from '../../events';

export interface IRepositoryBase {
  insert(key: string, events: IEventBase[]): Promise<void>;
  find(process: (events: IEventBase[]) => void): Promise<void>;
  find(key: string, process: (events: IEventBase[]) => void): Promise<void>;
}