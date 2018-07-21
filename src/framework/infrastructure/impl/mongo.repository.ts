import { IRepository, IDocument } from '../interfaces';
import { IAggregate } from '../../aggregates';
import { IEventBase } from '../../events';
import { Collection } from 'mongoose';

const noop = () => null;

export class MongoRepository<T extends IAggregate> implements IRepository<T> {
  constructor(
    private readonly collection: Collection,
  ) {}

  public async insert(key: string, events: IEventBase[]): Promise<void> {
    const document: IDocument = await this.collection.findOne({ _id: key });
    if (!!document) {
      events.forEach((event) => document.events.push(event));
      await this.collection.updateOne(
        { _id: key },
        {
          $set: {
            events: document.events,
          },
        },
      );
    } else {
      await this.collection.insertOne({
        _id: key,
        events,
      });
    }
  }

  public async find(arg1: any, arg2?: any): Promise<T | T[]> {
    let key: string;
    let process: (events: IEventBase[]) => T = noop;
    if (!!arg1 && !!arg2) {
      key = arg1;
      process = arg2;
    } else {
      process = arg1;
    }
    if (!!key) {
      return process((await this.collection.findOne({ _id: key })).events);
    } else {
      return (await this.collection.find().toArray())
        .map((document: IDocument) => process(document.events));
    }
  }

}