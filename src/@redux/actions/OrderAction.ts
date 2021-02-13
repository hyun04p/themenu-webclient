import { ActionCreator } from '@redux/Types';

export enum Types {
  // SETTERS
  SET_STORE = '[Order] set store',

  // COMMANDS
  FETCH_STORE = '[Order] start fetching menu',

  // QUERIES
  LOAD_STORE_FIREBASE = '[Order] load menu object from firestore',
}

export const fetchStore: ActionCreator<void> = () => {
  return {
    type: Types.FETCH_STORE,
    payload: null,
  };
};
