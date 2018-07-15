import { IRepositoryBase, IDocumentBase } from '../interfaces';
import { InMemoryRepositoryImpl } from './in-memory.repository';
import { IEventBase } from '../../events';

describe('In Memory Repository', () => {
  it('should create a new document in the collection', async () => {
    const events: IEventBase[] = [
      {
        type: 'NEW_TEST_CREATED',
      },
    ];
    const collection: IDocumentBase[] = [];
    const repository: IRepositoryBase = new InMemoryRepositoryImpl(collection);
    expect(await repository.insert('id', events)).toBeTruthy();
    expect(collection.find((document) => document._id === 'id')).toEqual({
      _id: 'id',
      events: [
        {
          type: 'NEW_TEST_CREATED',
        },
      ],
    });
  });

  it('should add events to an existing collection document', async () => {
    const events: IEventBase[] = [
      {
        type: 'NEW_TEST_CREATED',
      },
    ];
    const collection: IDocumentBase[] = [
      {
        _id: 'id',
        events,
      },
    ];
    const repository: IRepositoryBase = new InMemoryRepositoryImpl(collection);
    const newEvents: IEventBase[] = [
      {
        type: 'TEST_SUCCEED',
      },
      {
        type: 'TEST_FAILED',
      },
    ];
    await repository.insert('id', newEvents);
    expect(collection.find((document) => document._id === 'id')).toEqual({
      _id: 'id',
      events: [
        {
          type: 'NEW_TEST_CREATED',
        },
        {
          type: 'TEST_SUCCEED',
        },
        {
          type: 'TEST_FAILED',
        },
      ],
    });
  });

  it('should get all events for a specific document when find by id', async () => {
    const events: IEventBase[] = [
      {
        type: 'NEW_TEST_CREATED',
        id: 'id',
      },
    ];
    const collection: IDocumentBase[] = [
      {
        _id: 'id',
        events,
      },
    ];
    const repository: IRepositoryBase = new InMemoryRepositoryImpl(collection);
    expect(await repository.find((entity) => entity.id === 'id')).toEqual(events);
  });

  it('should find all events for a specific document when find with an event property', async () => {
    const events: IEventBase[] = [
      {
        type: 'NEW_TEST_CREATED',
        id: 'id',
        owner: 'tester',
      },
    ];
    const collection: IDocumentBase[] = [
      {
        _id: 'id',
        events,
      },
    ];
    const repository: IRepositoryBase = new InMemoryRepositoryImpl(collection);
    expect(await repository.find((entity: any) => entity.owner === 'tester')).toEqual(events);
  });
});
