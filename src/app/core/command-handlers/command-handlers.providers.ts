import { Provider } from '@nestjs/common';
import { IRepository } from '../../../framework/infrastructure';
import { SharedAccountAggregate } from '../domain/aggregates';
import { SharedAccountCommandHandler } from './impl';
import { ICommandHandler } from '../../../framework/command-handlers';

export const providers: Provider[] = [
  {
    provide: 'SharedAccountCommandHandler',
    useFactory: (repository: IRepository<SharedAccountAggregate>) => new SharedAccountCommandHandler(repository),
    inject: [ 'SharedAccountRepository' ],
  },
  {
    provide: 'CommandHandlers',
    useFactory: (...handlers: ICommandHandler<any>[]) => {
      const commandHandlers = new Map<string, ICommandHandler<any>>();
      handlers.forEach(
        (handler: ICommandHandler<any>) => {
          commandHandlers.set(
            handler.constructor.name.replace('CommandHandler', '').replace(/([A-Z])/g, '-$1').toLowerCase().slice(1),
            handler,
          );
        },
      );
      return commandHandlers;
    },
    inject: [ 'SharedAccountCommandHandler' ],
  },
];
