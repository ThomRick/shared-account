import { ICommandBase } from '../../commands';

export interface ICommandHandler<T extends ICommandBase> {
  handle(command: T): Promise<void>;
}
