export interface IEventBase {
  readonly type: string;
  readonly [key: string]: any;
}
