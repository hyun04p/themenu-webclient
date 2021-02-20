import { UIAction } from '@store/actions';
import { MiddlewareParam } from '@store/Types';
import { Notifications } from '@util';
import { Middleware } from 'redux';

/**
 *
 */
let routeThrottled = false;
const throttleRouteTo: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: UIAction.ActionTypes) => {
  if (action.type !== UIAction.Types.ROUTE_TO) return next(action);

  if (routeThrottled) {
    return console.log('route throttled ');
  }
  console.log('begin routing');

  routeThrottled = true;
  return next(action);
};

/**
 *
 */
const routeToExplore: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: UIAction.ActionTypes) => {
  if (
    action.type !== UIAction.Types.ROUTE_TO ||
    action.payload.to !== '/explore'
  )
    return next(action);

  setTimeout(() => {
    console.log('[RouteMiddleware] routing /explore');
    action.payload.history.push(action.payload.to);
    next(action);
  }, 500);
};

/**
 *
 */
const routeToOrder: Middleware = ({ dispatch, getState }: MiddlewareParam) => (
  next
) => (action: UIAction.ActionTypes) => {
  if (action.type !== UIAction.Types.ROUTE_TO || action.payload.to !== '/order')
    return next(action);

  if (!getState().Auth.guest.isTimestampValid) {
    dispatch(UIAction.queueNotification(Notifications.INVALID_ORDER_URL));
    next(action);
    return;
  }

  action.payload.history.push(action.payload.to);
  next(action);
};

/**
 *
 */
const finishRouting: Middleware = ({ dispatch, getState }: MiddlewareParam) => (
  next
) => (action: UIAction.ActionTypes) => {
  if (action.type !== UIAction.Types.ROUTE_TO) return next(action);

  routeThrottled = false;
  next(action);
};

/**
 * order does not matter
 */
const routes = [routeToExplore, routeToOrder];

/**
 * order matters
 */
const routeMiddleware = [throttleRouteTo, ...routes, finishRouting];

export default routeMiddleware;
