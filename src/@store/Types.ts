import { RootState } from '@store';

export type ActionCreator<T> = (param: T) => { type: string; payload: any };

export type Reducer<T> = (state: T, action: Action) => T;

export type MiddlewareParam = {
  dispatch: Function;
  getState: () => RootState;
};

export interface Action {
  type: string;
  payload: any;
}
