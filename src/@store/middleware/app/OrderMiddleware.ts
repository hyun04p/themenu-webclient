import { db } from '@firebase';
import store from '@store';
import { OrderAction, UIAction } from '@store/actions';
import { Action, MiddlewareParam } from '@store/Types';
import { Const, Notifications } from '@util';
import { Middleware } from 'redux';
import md5 from 'md5';

const fetchStore: Middleware = ({ dispatch, getState }: MiddlewareParam) => (
  next
) => (action: OrderAction.ActionTypes) => {
  if (action.type !== OrderAction.Types.FETCH_STORE) return next(action);

  const storeId = getState().Order.orderer.storeId;
  console.log('[fetchStore md] with storeId: ', storeId);

  if (!storeId) {
    dispatch(OrderAction.setIsOrdererValid(false));
    dispatch(UIAction.queueNotification(Notifications.INVALID_ORDER_URL));
    return;
  }

  db.doc(`/stores/${storeId}`)
    .get()
    .then((store) => {
      const data = store.data();
      if (!data) {
        console.log('[fetchOrder md] not found');
        dispatch(OrderAction.setIsOrdererValid(false));
        dispatch(UIAction.queueNotification(Notifications.INVALID_ORDER_URL));
        return;
      }
      dispatch(OrderAction.setStore(store.data()));
    })
    .catch((error) => {
      console.log('[fetchOrder md] error', error);
      dispatch(OrderAction.setIsOrdererValid(false));
      dispatch(UIAction.queueNotification(Notifications.INVALID_ORDER_URL));
      return;
    });
  next(action);
};

/**
 *
 */
const fetchOrder: Middleware = ({ dispatch, getState }: MiddlewareParam) => (
  next
) => (action: OrderAction.ActionTypes) => {
  if (action.type !== OrderAction.Types.FETCH_ORDER) return next(action);

  const orderer = getState().Order.orderer;

  db.doc(`/stores/${orderer.storeId}/orders/${orderer.tableNum}`)
    .get()
    .then((order) => {
      const data = order.data();
      if (!data) {
        // unregister timestamp
      }

      // valid query string =>
    });

  next(action);
};

/**
 *
 */
const putItemToBucket: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: OrderAction.ActionTypes) => {
  if (action.type !== OrderAction.Types.PUT_ITEM_TO_BUCKET) return next(action);

  // if exists, merge

  const { itemId, options } = action.payload;
  const sortedOption = [...options];
  sortedOption.sort((a, b) => (a.name > b.name ? 1 : -1));
  const id = md5(itemId + JSON.stringify(sortedOption));
  action.payload.id = id;
  // else
  // if (getState().Order.order.bucket[action.payload.id] !== undefined) {
  //   // add
  // } else {
  //   // merge
  // }

  next(action);
};

/**
 *
 */
const persistOrdererLocalstorage: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: OrderAction.ActionTypes) => {
  if (action.type !== OrderAction.Types.SET_ORDERER) return next(action);

  localStorage.setItem(
    Const.LOCALSTORAGE_KEY.ORDERER_STORE_ID,
    action.payload.storeId
  );
  localStorage.setItem(
    Const.LOCALSTORAGE_KEY.ORDERER_TABLE_NUM,
    '' + action.payload.tableNum
  );
  localStorage.setItem(
    Const.LOCALSTORAGE_KEY.ORDERER_SEAT_NUM,
    '' + action.payload.seatNum
  );

  next(action);
};

/**
 *
 */
const retreiveOrdererLocalstorage: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: OrderAction.ActionTypes) => {
  if (action.type !== OrderAction.Types.RETREIVE_ORDERER_LOCALSTORAGE)
    return next(action);

  const storeId = localStorage.getItem(Const.LOCALSTORAGE_KEY.ORDERER_STORE_ID);
  const tableNum = localStorage.getItem(
    Const.LOCALSTORAGE_KEY.ORDERER_TABLE_NUM
  );
  const seatNum = localStorage.getItem(Const.LOCALSTORAGE_KEY.ORDERER_SEAT_NUM);

  if (
    storeId !== null &&
    tableNum !== null &&
    seatNum !== null &&
    !isNaN(parseInt(tableNum)) &&
    !isNaN(parseInt(seatNum))
  ) {
    dispatch(
      OrderAction.setOrderer(storeId, parseInt(tableNum), parseInt(seatNum))
    );
  } else {
    dispatch(OrderAction.setIsOrdererValid(false));
  }

  next(action);
};

const orderMiddleware = [
  fetchStore,
  fetchOrder,
  persistOrdererLocalstorage,
  retreiveOrdererLocalstorage,
  putItemToBucket,
];
export default orderMiddleware;
