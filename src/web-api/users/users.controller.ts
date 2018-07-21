import { Controller, Put, Param, Body } from '@nestjs/common';
import { IAddSharedAccountUserDto } from './models';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Put('shared-accounts/:accountID/users')
  public async addUser(@Param('accountID') accountID: string, @Body() body: IAddSharedAccountUserDto) {
    return this.service.addUser(accountID, body);
  }
}
