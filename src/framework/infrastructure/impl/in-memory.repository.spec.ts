import { IRepository, IDocument } from '../interfaces';
import { InMemoryRepository } from './in-memory.repository';
import { IEventBase } from '../../events';
import { IAggregate } from '../../aggregates';

class TestAggregate implements IAggregate {
  public readonly uncommittedChanges: IEventBase[];
  public rebuild(events: IEventBase[]): IAggregate {
    throw new Error('Method not implemented.');
  }
  public map(): any {}
}

describe('InMemoryRepository', () => {
  let collection: Map<string, IDocument>;
  let repository: IRepository<TestAggregate>;

  beforeEach(() => {
    collection = new Map<string, IDocument>();
    repository = new InMemoryRepository(collection);
  });

  const createEvent = (type: string): IEventBase => ({ type });

  it('should have a new document with events when insert', async () => {
    const key: string = 'id';
    const events: IEventBase[] = [ createEvent('TEST_CREATED') ];
    await repository.insert(key, events);
    expect(collection.get(key)).toEqual({ _id: key, events });
  });

  it('should insert new events to an existing document when insert on existing document', async () => {
    const key: string = 'id';
    collection.set(key, {_id: key, events: [ createEvent('TEST_CREATED') ] });
    await repository.insert(key, [ createEvent('TEST_PASSED') ]);
    expect(collection.get(key)).toEqual(
      { _id: key, events: [ createEvent('TEST_CREATED'), createEvent('TEST_PASSED') ] },
    );
  });

  it('should execute the process for each document repository when find without a key', async () => {
    collection.set('documentA', { _id: 'documentA', events: [ createEvent('DOCUMENT_CREATED') ] });
    collection.set('documentB', { _id: 'documentB', events: [ createEvent('DOCUMENT_CREATED') ] });
    collection.set('documentC', { _id: 'documentC', events: [ createEvent('DOCUMENT_CREATED') ] });
    const process = jest.fn();
    await repository.find(process);
    expect(process).toHaveBeenCalledTimes(3);
  });

  it('should execute the process for the specified key document events when find with a key', async () => {
    collection.set('documentA', { _id: 'documentA', events: [ createEvent('DOCUMENT_CREATED') ] });
    collection.set('documentB', { _id: 'documentB', events: [ createEvent('DOCUMENT_CREATED') ] });
    collection.set('documentC', { _id: 'documentC', events: [ createEvent('DOCUMENT_CREATED') ] });
    const process = jest.fn();
    await repository.find('documentA', process);
    expect(process).toHaveBeenCalledTimes(1);
  });
});
