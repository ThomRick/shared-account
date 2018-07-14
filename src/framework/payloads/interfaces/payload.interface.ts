import { IPayloadData } from './payload-data.interface';

export interface IPayload {
  readonly type: string;
  readonly data: IPayloadData;
}