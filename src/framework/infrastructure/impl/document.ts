import { IDocument } from '../interfaces';
import { IEventBase } from '../../events';

export class Document implements IDocument {
  constructor(
    public readonly _id: string,
    public readonly events: IEventBase[] = [],
  ) {}

  public add(event: IEventBase): number {
    return this.events.push(event);
  }
}