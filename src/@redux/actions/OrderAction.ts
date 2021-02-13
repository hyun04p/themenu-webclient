import { ActionCreator } from '@redux/Types';
import { parseCommandLine } from 'typescript';
import { OrderAction } from '.';

export enum Types {
  // SETTERS
  SET_STORE = '[Order] set store',
  SET_ORDERER = '[Order] set orderer',
  SET_LOADING = '[Order] set loading',

  // COMMANDS
  FETCH_STORE = '[Order] start fetching menu',

  // QUERIES
  LOAD_STORE_FIREBASE = '[Order] load menu object from firestore',
}

export const fetchStore: ActionCreator<{
  orderer: { storeId: string; tableNum: number; seatNum: number };
}> = (param) => {
  return {
    type: Types.FETCH_STORE,
    payload: param.orderer,
  };
};

export const loadStoreFirebase: ActionCreator<{
  store: { storeId: string; tableNum: number; seatNum: number };
}> = (param) => {
  return {
    type: Types.LOAD_STORE_FIREBASE,
    payload: param.store,
  };
};

export const setStore: ActionCreator<any> = (store) => {
  return {
    type: Types.SET_STORE,
    payload: store,
  };
};

export const setOrderer: ActionCreator<{
  orderer: { storeId: string; tableNum: number; seatNum: number };
}> = (param) => {
  return {
    type: Types.SET_ORDERER,
    payload: param.orderer,
  };
};

export const setLoading: ActionCreator<boolean> = (isLoading) => {
  return {
    type: Types.SET_LOADING,
    payload: {
      loading: isLoading,
    },
  };
};
