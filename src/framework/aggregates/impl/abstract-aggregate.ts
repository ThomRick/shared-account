import { IAggregateBase } from '../interfaces';
import { IEventBase } from '../../events';
import { IReadModel } from '../../read-model/interfaces/read-model-base.interface';

export abstract class AbstractAggregate implements IAggregateBase {
  protected abstract _id: string;
  protected abstract _model: IReadModel;

  public readonly uncommittedChanges: IEventBase[];

  constructor() {
    this.uncommittedChanges = [];
  }

  protected abstract apply(event: IEventBase): IAggregateBase;

  public rebuild(events: IEventBase[]): IAggregateBase {
    return events.reduce<IAggregateBase>(
      (aggregate: IAggregateBase, event: IEventBase) => (aggregate as AbstractAggregate).apply(event),
      this.empty(),
    );
  }

  protected abstract empty(): IAggregateBase;

  protected save(event: IEventBase): void {
    this.uncommittedChanges.push(event);
  }

  public get id(): string {
    return this._id;
  }

  public get model(): IReadModel {
    return this._model;
  }
}
