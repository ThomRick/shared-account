import { IAggregateBase } from './aggregate-base.interface';

export interface IAggregateConstructor {
  new(): IAggregateBase;
}
