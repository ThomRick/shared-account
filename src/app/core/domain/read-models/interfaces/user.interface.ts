import { IReadModel } from '../../../../../framework/read-model';

export interface IUserModel extends IReadModel {
  readonly id: string;
}
