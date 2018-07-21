export interface IQueryHandler {
  handle(): Promise<any>;
}
