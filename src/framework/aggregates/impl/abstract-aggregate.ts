import { IAggregate } from '../interfaces';
import { IEventBase } from '../../events';
import { IReadModel } from '../../read-model/interfaces/read-model-base.interface';

export abstract class AbstractAggregate implements IAggregate {
  protected abstract _id: string;

  public readonly uncommittedChanges: IEventBase[];

  constructor() {
    this.uncommittedChanges = [];
  }

  public map<T extends IReadModel>(actor: (aggregate: IAggregate) => T): T {
    return actor(this);
  }

  public rebuild(events: IEventBase[]): IAggregate {
    return events.reduce<IAggregate>(
      (aggregate: IAggregate, event: IEventBase) => (aggregate as AbstractAggregate).apply(event),
      this.empty(),
    );
  }

  protected abstract apply(event: IEventBase): IAggregate;
  protected abstract empty(): IAggregate;

  protected save(event: IEventBase): void {
    this.uncommittedChanges.push(event);
  }

  public get id(): string {
    return this._id;
  }
}
