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
  SHOW_MENU_DETAIL_MODAL = '[Order] show menu detial modal',
  HIDE_MENU_DETAIL_MODAL = '[Order] hide menu detail modal',
  PUT_ITEM_TO_BUCKET = '[Order] put item to bucket',
}

/**
 *
 */
interface BucketOption {
  name: string;
  price: number;
}
interface putItemToBucketAction {
  type: Types.PUT_ITEM_TO_BUCKET;
  payload: {
    id: string;
    itemId: string;
    count: number;
    options: BucketOption[];
  };
}
export const putItemToBucket = (
  id: string,
  itemId: string,
  count: number,
  options: BucketOption[]
): putItemToBucketAction => {
  return {
    type: Types.PUT_ITEM_TO_BUCKET,
    payload: {
      id: id,
      itemId: itemId,
      count: count,
      options: options,
    },
  };
};

/**
 *
 */
interface showMenuDetailModalAction {
  type: Types.SHOW_MENU_DETAIL_MODAL;
  payload: {
    itemId: string;
  };
}
export const showMenuDetailModal = (
  itemId: string
): showMenuDetailModalAction => {
  return {
    type: Types.SHOW_MENU_DETAIL_MODAL,
    payload: {
      itemId: itemId,
    },
  };
};

/**
 *
 */
interface hideMenuDetailModalAction {
  type: Types.HIDE_MENU_DETAIL_MODAL;
}
export const hideMenuDetailModal = (): hideMenuDetailModalAction => {
  return {
    type: Types.HIDE_MENU_DETAIL_MODAL,
  };
};

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
  meta: {
    throttle: number;
  };
}
export const fetchStore = (): fetchStoreAction => {
  return {
    type: Types.FETCH_STORE,
    meta: {
      throttle: 30000,
    },
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
  | retreiveOrdererLocalstorageAction
  | showMenuDetailModalAction
  | hideMenuDetailModalAction
  | putItemToBucketAction;
