import { Controller, Put, Param, Body } from '@nestjs/common';
import { ExpendsService } from './expends.service';
import { IAddSharedAccountExpendDto } from './models';

@Controller()
export class ExpendsController {
  constructor(private readonly service: ExpendsService) {}

  @Put('shared-accounts/:accountID/expends')
  public async addExpend(@Param('accountID') accountID: string, @Body() body: IAddSharedAccountExpendDto): Promise<void> {
    return this.service.addExpend(accountID, body);
  }
}