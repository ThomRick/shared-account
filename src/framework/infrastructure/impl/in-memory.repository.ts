import { IRepositoryBase, IDocumentBase } from '../interfaces';
import { IEventBase } from '../../events';
import { DocumentImpl } from './document';

export class InMemoryRepositoryImpl implements IRepositoryBase {
  constructor(private readonly collection: IDocumentBase[] = []) {}

  public async insert(key: string, events: IEventBase[]): Promise<boolean> {
    const index: number = this.collection.findIndex((document: IDocumentBase) => document._id === key);
    if (index !== -1) {
      this.collection[ index ].events.push(...events);
    } else {
      const document = new DocumentImpl(key);
      events.forEach((event) => document.add(event));
      this.collection.push(document);
    }
    return true;
  }

  public async find(query: (entity: any) => boolean): Promise<IEventBase[]> {
    const document: IDocumentBase = this.collection.find(
      (doc: IDocumentBase) => !!doc.events.find(query),
    );
    return !!document ? document.events : [];
  }
}
