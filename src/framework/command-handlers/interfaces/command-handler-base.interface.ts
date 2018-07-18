import { ICommandBase } from '../../commands';

export interface ICommandHandlerBase {
  handle(command: ICommandBase): Promise<void>;
}
