import { Controller, Post, Param, Body } from '@nestjs/common';
import { ICommand } from '../../../framework/commands';

@Controller('commands')
export class CommandsController {
  @Post(':handler')
  public async handle(@Param('handler') handler: string, @Body() body: ICommand) {

  }
}
