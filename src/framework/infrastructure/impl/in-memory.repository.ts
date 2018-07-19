import { IRepositoryBase, IDocumentBase } from '../interfaces';
import { IEventBase } from '../../events';
import { DocumentImpl } from './document';

export class InMemoryRepository implements IRepositoryBase {
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

  public async find(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}