import { IEventBase } from '../../events';

export interface IRepositoryBase {
  insert(key: string, events: IEventBase[]): Promise<boolean>;
  find(query: (entity: any) => boolean): Promise<IEventBase[]>;
}