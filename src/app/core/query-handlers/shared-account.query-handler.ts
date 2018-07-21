import { IQueryHandler } from '../../../framework/query-handlers';
import { IRepository, InMemoryRepository } from '../../../framework/infrastructure';
import { SharedAccountAggregate } from '../domain/aggregates/impl';

export class SharedAccountQueryHandler implements IQueryHandler {
  constructor(private readonly repository: IRepository<SharedAccountAggregate> = new InMemoryRepository()) {}

  public async handle(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
