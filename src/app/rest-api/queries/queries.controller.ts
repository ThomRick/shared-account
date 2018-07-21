import { Controller, Get, Param, Inject } from '@nestjs/common';
import { IAggregate } from '../../../framework/aggregates';
import { IQueryHandler } from 'framework/query-handlers';

@Controller('queries')
export class QueriesController {
  constructor(@Inject('QueryHandlers') private readonly handlers: Map<string, IQueryHandler<IAggregate>>) {}

  @Get(':name')
  public async handleAll(@Param('name') name: string): Promise<IAggregate | IAggregate[]> {
    return await this.handlers.get(name).handle();
  }

  @Get(':name/:id')
  public async handleById(@Param('name') name: string, @Param('id') id: string): Promise<IAggregate | IAggregate[]> {
    return await this.handlers.get(name).handle(id);
  }

}