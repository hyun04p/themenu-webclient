import { OrderAction } from '@redux/actions';
import { Action, MiddlewareParam } from '@redux/Types';

const OrderMiddleware = ({ dispatch, getState }: MiddlewareParam) => (
  next: any
) => (action: Action) => {
  next(action);

  /**
   *
   */
  if (OrderAction.Types.FETCH_STORE === action.type) {
    dispatch();
  }

  /**
   *
   */
  if (OrderAction.Types.LOAD_STORE_FIREBASE === action.type) {
  }
};

export default OrderMiddleware;
