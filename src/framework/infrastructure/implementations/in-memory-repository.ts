import { IRepositoryBase } from '../interfaces';
import { AbstractAggregate } from '../../aggregates';
import { IEventBase } from '../../events';
import { IAggregateConstructor } from '../../aggregates/interfaces/aggregate-constructor.interface';

export class InMemoryRepository<T extends AbstractAggregate>implements IRepositoryBase<T> {
  constructor(
    private readonly ctor: IAggregateConstructor,
    private readonly collection = new Map<string, IEventBase[]>(),
  ) {}

  public async insert(aggregate: T): Promise<boolean> {
    const events: IEventBase[] = this.collection.get(aggregate.id) || [];
    while (aggregate.uncommittedChanges.length !== 0) {
      events.push(aggregate.uncommittedChanges.shift());
    }
    this.collection.set(aggregate.id, events);
    return true;
  }

  public async findAll(): Promise<T[]> {
    const aggregates: T[] = [];
    this.collection.forEach(
      (events: IEventBase[]) => aggregates.push(new this.ctor().rebuild(events) as T),
    );
    return aggregates;
  }

  public async find(query: (aggregate: T) => boolean): Promise<T> {
    return (await this.findAll()).find(query);
  }
}
