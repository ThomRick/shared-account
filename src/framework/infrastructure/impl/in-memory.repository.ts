import { IRepository, IDocument } from '../interfaces';
import { IEventBase } from '../../events';
import { DocumentImpl } from './document';
import { IAggregate } from '../../aggregates';

const noop = () => null;

export class InMemoryRepository<T extends IAggregate> implements IRepository<T> {
  constructor(
    private readonly collection: Map<string, IDocument> = new Map<string, IDocument>(),
  ) {}

  public async insert(key: string, events: IEventBase[]): Promise<void> {
    const document: IDocument = this.collection.get(key) || new DocumentImpl(key);
    events.forEach(
      (event: IEventBase) => document.add(event),
    );
    this.collection.set(key, document);
  }

  public async find(key: string, process: (events: IEventBase[]) => T): Promise<T | T[]>;
  public async find(process: (events: IEventBase[]) => T): Promise<T | T[]>;
  public async find(arg1: any, arg2?: any): Promise<T | T[]> {
    let key: string;
    let process: (events: IEventBase[]) => T = noop;
    if (!!arg1 && !!arg2) {
      key = arg1;
      process = arg2;
    } else {
      process = arg1;
    }
    if (!!key) {
      return process(this.collection.get(key).events);
    } else {
      const aggregates: T[] = [];
      this.collection.forEach(
        (document: IDocument) => aggregates.push(process(document.events)),
      );
      return aggregates;
    }
  }
}