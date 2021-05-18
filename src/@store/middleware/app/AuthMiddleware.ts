import { AuthAction, OrderAction } from '@store/actions';
import { MiddlewareParam } from '@store/Types';
import { Const } from '@util';

import { Middleware } from 'redux';

/**
 *
 */
const renewGuestTimestamp: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: AuthAction.ActionTypes) => {
  if (action.type !== AuthAction.Types.RENEW_GUEST_TIMESTAMP) {
    return next(action);
  }
  if (!getState().Auth.guest.isTimestampValid) return;

  dispatch(AuthAction.setGuestTimestamp());
  dispatch(AuthAction.persistGuestTimestampLocalstorage());
};

const setGuestTimestamp: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: AuthAction.ActionTypes) => {
  if (action.type !== AuthAction.Types.SET_GUEST_TIMESTAMP) {
    return next(action);
  }

  if (!action.payload.timestamp) {
    const now = new Date();
    const timestamp = now.getTime() + Const.TIMESTAMP_VALID_FOR_MIN * 60000;
    action.payload.timestamp = timestamp;
    return next(action);
  }

  next(action);
};

/**
 *
 */
const registerGuestTimestamp: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: AuthAction.ActionTypes) => {
  if (action.type !== AuthAction.Types.REGISTER_GUEST_TIMESTAMP) {
    return next(action);
  }

  next(action);
  dispatch(AuthAction.setGuestTimestamp());
  dispatch(AuthAction.setGuestIsTimestampValid(true));
  dispatch(AuthAction.persistGuestTimestampLocalstorage());
  dispatch(AuthAction.initGuestTimestampObserver());
};

const unregisterGuestTimestamp: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: AuthAction.ActionTypes) => {
  if (action.type !== AuthAction.Types.UNREGISTER_GUEST_TIMESTAMP)
    return next(action);

  dispatch(AuthAction.setGuestTimestamp(-1));
  localStorage.removeItem(Const.LOCALSTORAGE_KEY.GUEST_TIME_STAMP);
  dispatch(AuthAction.setGuestIsTimestampValid(false));

  next(action);
};

/**
 *
 */
const initGuestTimestampObserver: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: AuthAction.ActionTypes) => {
  if (action.type !== AuthAction.Types.INIT_GUEST_TIMESTAMP_OBSERVER) {
    return next(action);
  }

  const observerId = setInterval(() => {
    const now = new Date().getTime();
    const timestamp = getState().Auth.guest.timestamp;

    if (timestamp < now) {
      dispatch(AuthAction.unregisterGuestTimestamp());
      // dispatch(AuthAction.setGuestIsTimestampValid(false));
      clearInterval(observerId);
    }
  }, 2000);

  next(action);
};

/**
 *
 */
const persisGuestTimestampLocalstorage: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: AuthAction.ActionTypes) => {
  if (action.type !== AuthAction.Types.PERSIST_GUEST_TIMESTAMP_LOCALSTORAGE)
    return next(action);

  const timestamp = getState().Auth.guest.timestamp;
  localStorage.setItem(Const.LOCALSTORAGE_KEY.GUEST_TIME_STAMP, '' + timestamp);
  // next(action);
};

/**
 *
 */
const retrieveGuestTimestampLocalstorage: Middleware = ({
  dispatch,
  getState,
}: MiddlewareParam) => (next) => (action: AuthAction.ActionTypes) => {
  if (action.type !== AuthAction.Types.RETRIEVE_GUEST_TIMESTAMP_LOCALSTORAGE)
    return next(action);

  const timestampStr = localStorage.getItem(
    Const.LOCALSTORAGE_KEY.GUEST_TIME_STAMP
  );

  if (timestampStr === null) return;

  const timestamp = parseInt(timestampStr);
  const now = new Date().getTime();

  if (timestamp > now) {
    dispatch(AuthAction.registerGuestTimestamp());
  } else {
    localStorage.removeItem(Const.LOCALSTORAGE_KEY.GUEST_TIME_STAMP);
  }
  next(action);
};

/**
 *
 */
const populate: Middleware = ({ dispatch, getState }: MiddlewareParam) => (
  next
) => (action: AuthAction.ActionTypes) => {
  if (action.type !== AuthAction.Types.POPULATE) return next(action);
  dispatch(OrderAction.retreiveOrdererLocalstorage());
  dispatch(AuthAction.retrieveGuestTimestampLocalstorage());
};

const authMiddleware = [
  renewGuestTimestamp,
  registerGuestTimestamp,
  unregisterGuestTimestamp,
  initGuestTimestampObserver,
  setGuestTimestamp,
  persisGuestTimestampLocalstorage,
  retrieveGuestTimestampLocalstorage,
  populate,
];
export default authMiddleware;
