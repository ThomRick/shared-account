import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { SharedAccountsService } from './shared-accounts.service';
import { ICreateSharedAccountDto } from './models/create-shared-account.dto';

@Controller('shared-accounts')
export class SharedAccountsController {
  constructor(private readonly service: SharedAccountsService) {}

  @Post()
  public async create(@Body() body: ICreateSharedAccountDto): Promise<any> {
    return this.service.create(body);
  }

  @Get()
  public async findAll(): Promise<any> {
    return this.service.findAll();
  }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<any> {
    return this.service.findById(id);
  }
}