import { IEventBase } from '../../events';

export interface IDocumentBase {
  _id: string;
  events: IEventBase[];
}
