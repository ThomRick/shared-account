import { Controller, Get } from '@nestjs/common';
import { IReadModel } from '../../../framework/read-model';

@Controller('queries')
export class QueriesController {
  @Get(':id')
  public async handle(): Promise<IReadModel> {
    return undefined;
  }
}