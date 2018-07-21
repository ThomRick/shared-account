import { IQueryHandler } from '../../../../framework/query-handlers';
import { IRepository, InMemoryRepository } from '../../../../framework/infrastructure';
import { SharedAccountAggregate } from '../../domain/aggregates/impl';
import { IEventBase } from 'framework/events';

export class SharedAccountQueryHandler implements IQueryHandler<SharedAccountAggregate> {
  constructor(
    private readonly repository: IRepository<SharedAccountAggregate> = new InMemoryRepository(),
  ) {}

  public async handle(id?: string): Promise<SharedAccountAggregate | SharedAccountAggregate[]> {
    if (!id) {
      const aggregates: SharedAccountAggregate[] = [];
      (await this.repository.find(
        (events: IEventBase[]) => this.rebuildProcess(events)) as SharedAccountAggregate[]
      ).forEach((account) => aggregates.push(account));
      return aggregates;
    } else {
      return await this.repository.find(id, (events: IEventBase[]) => this.rebuildProcess(events));
    }
  }

  private rebuildProcess(events: IEventBase[]): SharedAccountAggregate {
    return new SharedAccountAggregate().rebuild(events) as SharedAccountAggregate;
  }
}
