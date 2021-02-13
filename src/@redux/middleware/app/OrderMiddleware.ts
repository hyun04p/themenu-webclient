import { dbService } from '@firebase';
import { OrderAction } from '@redux/actions';
import { loadStoreFirebase } from '@redux/actions/OrderAction';
import { Action, MiddlewareParam } from '@redux/Types';

const OrderMiddleware = ({ dispatch, getState }: MiddlewareParam) => (
  next: any
) => (action: Action) => {
  next(action);

  /**
   *
   */
  if (OrderAction.Types.FETCH_STORE === action.type) {
    const { storeId, tableNum, seatNum } = action.payload;
    if (storeId !== undefined && tableNum !== undefined) {
      dispatch(
        loadStoreFirebase({
          store: { storeId: storeId, tableNum: tableNum, seatNum: seatNum },
        })
      );
    }
  }

  /**
   *
   */
  if (OrderAction.Types.LOAD_STORE_FIREBASE === action.type) {
    const { payload } = action;

    // .collection(`stores/${payload.storeId}/orders`)
    const ref = dbService.collection(`stores/${payload.storeId}/orders`);
    console.log(payload.tableNum);
    const tableNum = payload.tableNum.toString();
    console.log(tableNum);
    ref
      .doc(tableNum)
      .get()
      .then((tableDocSnapshot) => {
        console.log(tableDocSnapshot.data());
        if (tableDocSnapshot.exists) {
          dbService
            .collection('stores')
            .doc(payload.storeId)
            .get()
            .then((storeDocSnapshot) => {
              dispatch(OrderAction.setStore(storeDocSnapshot.data()));
              dispatch(
                OrderAction.setOrderer({
                  orderer: {
                    storeId: payload.storeId,
                    tableNum: tableNum,
                    seatNum: payload.seatNum,
                  },
                })
              );
              dispatch(OrderAction.setLoading(false));
            })
            .catch((e) => {
              dispatch(OrderAction.setLoading(false));
              console.log(e);
            });
        } else {
          dispatch(OrderAction.setLoading(false));
        }
      })
      .catch((e) => {
        dispatch(OrderAction.setLoading(false));
        console.log('[OrderMiddleware] store or table not found');
        console.log(e);
      });
  }
};

export default OrderMiddleware;
