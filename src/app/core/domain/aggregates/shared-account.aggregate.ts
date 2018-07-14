import { AbstractAggregate } from '../../../../framework/aggregates';
import { IEventBase } from '../../../../framework/events';
import { ISharedAccountModel } from '../read-models/interfaces';

export class SharedAccountAggregate extends AbstractAggregate {
  protected _id: string;
  protected _model: ISharedAccountModel;

  protected apply(event: IEventBase): SharedAccountAggregate {
    return this;
  }

  protected empty(): SharedAccountAggregate {
    return new SharedAccountAggregate();
  }
}