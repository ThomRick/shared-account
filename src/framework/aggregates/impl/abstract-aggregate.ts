import { IAggregate } from '../interfaces';
import { IEventBase } from '../../events';
import { IReadModel } from '../../read-model/interfaces/read-model-base.interface';

export abstract class AbstractAggregate implements IAggregate {
  protected abstract _id: string;
  protected abstract _model: IReadModel;

  public readonly uncommittedChanges: IEventBase[];

  constructor() {
    this.uncommittedChanges = [];
  }

  protected abstract apply(event: IEventBase): IAggregate;

  public rebuild(events: IEventBase[]): IAggregate {
    return events.reduce<IAggregate>(
      (aggregate: IAggregate, event: IEventBase) => (aggregate as AbstractAggregate).apply(event),
      this.empty(),
    );
  }

  protected abstract empty(): IAggregate;

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
