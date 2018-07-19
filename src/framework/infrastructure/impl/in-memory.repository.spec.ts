import { IRepositoryBase, IDocumentBase } from '../interfaces';
import { InMemoryRepository } from './in-memory.repository';
import { IEventBase } from '../../events';
import { DocumentImpl } from './document';

describe('InMemoryRepository', () => {
  it('can be created', () => {
    const collection = new Map<string, IDocumentBase>();
    const repository: IRepositoryBase = new InMemoryRepository(collection);
  });

  it('should have a new document with events when insert', async () => {
    const collection = new Map<string, IDocumentBase>();
    const repository: IRepositoryBase = new InMemoryRepository(collection);
    const events: IEventBase[] = [
      {
        type: 'TEST_CREATED',
      },
    ];
    await repository.insert('id', events);
    expect(collection.get('id')).toEqual(new DocumentImpl('id', events));
  });

  it('should insert new events to an existing document when insert on existing document', async () => {
    const key: string = 'id';
    const collection = new Map<string, IDocumentBase>();
    const events: IEventBase[] = [
      {
        type: 'TEST_CREATED',
      },
    ];
    collection.set(key, new DocumentImpl(key, events));
    const repository: IRepositoryBase = new InMemoryRepository(collection);
    const newEvents: IEventBase[] = [
      {
        type: 'TEST_PASSED',
      },
    ];
    await repository.insert('id', newEvents);
    expect(collection.get('id')).toEqual(
      new DocumentImpl('id', [
        {
          type: 'TEST_CREATED',
        },
        {
          type: 'TEST_PASSED',
        },
      ]),
    );
  });
});
