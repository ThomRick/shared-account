import { IRepositoryBase, IDocumentBase } from '../interfaces';
import { InMemoryRepository } from './in-memory.repository';
import { IEventBase } from '../../events';
import { DocumentImpl } from './document';

describe('InMemoryRepository', () => {
  let collection: Map<string, IDocumentBase>;
  let repository: IRepositoryBase;

  beforeEach(() => {
    collection = new Map<string, IDocumentBase>();
    repository = new InMemoryRepository(collection);
  });

  const createEvent = (type: string): IEventBase => ({ type });

  it('should have a new document with events when insert', async () => {
    const key: string = 'id';
    const events: IEventBase[] = [ createEvent('TEST_CREATED') ];
    await repository.insert(key, events);
    expect(collection.get(key)).toEqual(new DocumentImpl(key, events));
  });

  it('should insert new events to an existing document when insert on existing document', async () => {
    const key: string = 'id';
    collection.set(key, new DocumentImpl(key, [ createEvent('TEST_CREATED') ]));
    await repository.insert(key, [ createEvent('TEST_PASSED') ]);
    expect(collection.get(key)).toEqual(
      new DocumentImpl(key, [ createEvent('TEST_CREATED'), createEvent('TEST_PASSED') ]),
    );
  });
});
