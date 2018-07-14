import { IPayload } from '../../payloads';
import { IReadModel } from '../../read-model';

export interface IHandler<T extends IPayload, U extends IReadModel> {
  handle(payload: T): Promise<U>;
}
