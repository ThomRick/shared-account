import { IEventBase } from '../../events';

export interface IDocument {
  _id: string;
  events: IEventBase[];
}
