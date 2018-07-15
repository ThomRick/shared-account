import { IDocumentBase } from '../interfaces';
import { IEventBase } from '../../events';

export class DocumentImpl implements IDocumentBase {
  constructor(
    public readonly _id: string,
    public readonly events: IEventBase[] = [],
  ) {}

  public add(event: IEventBase): number {
    return this.events.push(event);
  }
}