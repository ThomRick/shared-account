import { Controller, Post, Param, Body, Inject } from '@nestjs/common';
import { ICommand } from '../../../framework/commands';
import { ICommandHandler } from 'framework/command-handlers';

@Controller('commands')
export class CommandsController {
  constructor(@Inject('CommandHandlers') private readonly handlers: Map<string, ICommandHandler<ICommand>>) {}

  @Post(':name')
  public async handle(@Param('name') name: string, @Body() body: ICommand) {
    await this.handlers.get(name).handle(body);
  }
}
