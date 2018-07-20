import { Controller, Post, Param } from '@nestjs/common';

@Controller('commands')
export class CommandController {
  @Post(':id')
  public async handle(@Param('id') id: string) {

  }
}
