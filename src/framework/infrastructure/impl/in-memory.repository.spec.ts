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

  it('should execute the process for each document repository when find without a key', async () => {
    collection.set('documentA', new DocumentImpl('documentA', [ createEvent('DOCUMENT_CREATED') ]));
    collection.set('documentB', new DocumentImpl('documentB', [ createEvent('DOCUMENT_CREATED') ]));
    collection.set('documentC', new DocumentImpl('documentC', [ createEvent('DOCUMENT_CREATED') ]));
    const process = jest.fn();
    await repository.find(process);
    expect(process).toHaveBeenCalledTimes(3);
  });

  it('should execute the process for the specified key document events when find with a key', async () => {
    collection.set('documentA', new DocumentImpl('documentA', [ createEvent('DOCUMENT_CREATED') ]));
    collection.set('documentB', new DocumentImpl('documentB', [ createEvent('DOCUMENT_CREATED') ]));
    collection.set('documentC', new DocumentImpl('documentC', [ createEvent('DOCUMENT_CREATED') ]));
    const process = jest.fn();
    await repository.find('documentA', process);
    expect(process).toHaveBeenCalledTimes(1);
  });
});
