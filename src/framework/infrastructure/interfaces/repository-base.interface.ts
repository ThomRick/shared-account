import { IEventBase } from '../../events';

export interface IRepositoryBase {
  insert(): Promise<boolean>;
  find(): Promise<IEventBase[]>;
}