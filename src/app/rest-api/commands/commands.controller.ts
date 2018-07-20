import { Controller, Post, Param, Body, Inject } from '@nestjs/common';
import { ICommand } from '../../../framework/commands';
import { ICommandHandler } from 'framework/command-handlers';

@Controller('commands')
export class CommandsController {
  constructor(@Inject('CommandHandlers') private readonly handlers: Map<string, ICommandHandler<any>>) {}

  @Post(':handler')
  public async handle(@Param('handler') handlerName: string, @Body() body: ICommand) {
    const handler: ICommandHandler<any> = this.handlers.get(handlerName);
    if (!!handler) {
      await handler.handle(body);
    } else {
      throw new Error(`Can not manage handler : ${ handlerName }`);
    }
  }
}
