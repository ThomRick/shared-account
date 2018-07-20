import { ICommand } from '../../commands';

export interface ICommandHandler<T extends ICommand> {
  handle(command: T): Promise<void>;
}
