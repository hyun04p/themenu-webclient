import { ActionCreator } from '@store/Types';
import { parseCommandLine } from 'typescript';
import { OrderAction } from '.';

export enum Types {
  // SETTERS
  SET_ORDERER = '[Order] set orderer info',
  SET_STORE = '[Order] set store',
  FETCH_STORE = '[Order] fetch store',
  FETCH_ORDER = '[Order] fetch order',
  SET_IS_ORDERER_VALID = '[Order] set isOrdererValid',
  PERSIST_ORDERER_LOCALSTORAGE = '[Order] persist orderer localstorage',
  RETREIVE_ORDERER_LOCALSTORAGE = '[Order] retreive orderer localstorage',
}

/**
 *
 */
interface setOrdererAction {
  type: Types.SET_ORDERER;
  payload: {
    storeId: string;
    tableNum: number;
    seatNum: number;
  };
}
export const setOrderer = (
  storeId: string,
  tableNum: number,
  seatNum: number
): setOrdererAction => {
  return {
    type: Types.SET_ORDERER,
    payload: {
      storeId: storeId,
      tableNum: tableNum,
      seatNum: seatNum,
    },
  };
};

/**
 *
 */
interface setStoreAction {
  type: Types.SET_STORE;
  payload: {
    store: any;
  };
}
export const setStore = (store: any): setStoreAction => {
  return {
    type: Types.SET_STORE,
    payload: { store: store },
  };
};

/**
 *
 */
interface setIsOrdererValidAction {
  type: Types.SET_IS_ORDERER_VALID;
  payload: {
    isValid: boolean;
  };
}
export const setIsOrdererValid = (
  isValid: boolean
): setIsOrdererValidAction => {
  return {
    type: Types.SET_IS_ORDERER_VALID,
    payload: {
      isValid: isValid,
    },
  };
};

/**
 *
 */
interface fetchStoreAction {
  type: Types.FETCH_STORE;
}
export const fetchStore = (): fetchStoreAction => {
  return {
    type: Types.FETCH_STORE,
  };
};

/**
 *
 */
interface fetchOrderAction {
  type: Types.FETCH_ORDER;
}
export const fetOrder = (): fetchOrderAction => {
  return {
    type: Types.FETCH_ORDER,
  };
};

/**
 *
 */
interface persistOrdererLocalstorageAction {
  type: Types.PERSIST_ORDERER_LOCALSTORAGE;
}
export const persistOrdererLocalstorage = (): persistOrdererLocalstorageAction => {
  return {
    type: Types.PERSIST_ORDERER_LOCALSTORAGE,
  };
};

/**
 *
 */
interface retreiveOrdererLocalstorageAction {
  type: Types.RETREIVE_ORDERER_LOCALSTORAGE;
}
export const retreiveOrdererLocalstorage = (): retreiveOrdererLocalstorageAction => {
  return {
    type: Types.RETREIVE_ORDERER_LOCALSTORAGE,
  };
};

export type ActionTypes =
  | setOrdererAction
  | setStoreAction
  | setIsOrdererValidAction
  | fetchStoreAction
  | fetchOrderAction
  | persistOrdererLocalstorageAction
  | retreiveOrdererLocalstorageAction;
