import { IRepository, IDocumentBase } from '../interfaces';
import { IEventBase } from '../../events';
import { DocumentImpl } from './document';

const noop = () => {};

export class InMemoryRepository implements IRepository {
  constructor(
    private readonly collection: Map<string, IDocumentBase> = new Map<string, IDocumentBase>(),
  ) {}

  public async insert(key: string, events: IEventBase[]): Promise<void> {
    const document: IDocumentBase = this.collection.get(key) || new DocumentImpl(key);
    events.forEach(
      (event: IEventBase) => document.add(event),
    );
    this.collection.set(key, document);
  }

  public async find(key: string, process: (events: IEventBase[]) => void): Promise<void>;
  public async find(process: (events: IEventBase[]) => void): Promise<void>;
  public async find(arg1: any, arg2?: any) {
    let key: string;
    let process: (events: IEventBase[]) => void = noop;
    if (!!arg1 && !!arg2) {
      key = arg1;
      process = arg2;
    } else {
      process = arg1;
    }
    if (!!key) {
      process(this.collection.get(key).events);
    } else {
      this.collection.forEach(
        (document: IDocumentBase) => process(document.events),
      );
    }
  }
}