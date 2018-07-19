import { IEventBase } from '../../events';

export interface IRepositoryBase {
  insert(id: string, events: IEventBase[]): Promise<void>;
  find(): Promise<void>;
}