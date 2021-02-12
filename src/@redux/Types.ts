export interface Action {
  type: string;
  payload: any;
}

export type ActionCreator<T> = (param: T) => { type: string; payload: any };

export type Reducer<T> = (state: T, action: Action) => T;
