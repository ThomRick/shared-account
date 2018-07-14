import { IReadModel } from '../../../../../framework/read-model';

export interface IOperationModel extends IReadModel {
  readonly amount: number;
}
