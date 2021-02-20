import { Middleware } from 'redux';
import { FirebaseAction } from '@store/actions';
import { MiddlewareParam } from '@store/Types';
import { db } from '@firebase';

/**
 *
 */
const loadDoc: Middleware = ({ dispatch, getState }: MiddlewareParam) => (
  next
) => (action: FirebaseAction.ActionTypes) => {
  if (action.type !== FirebaseAction.Types.LOAD_DOC) return next(action);

  db.doc('/stores/mtO9jSgdSy2pMnTbieBQ/orders/1')
    .get()
    .then((s) => console.log(s.data()));

  next(action);
};

/**
 *
 */
const subscribeDoc: Middleware = ({ dispatch, getState }: MiddlewareParam) => (
  next
) => (action: FirebaseAction.ActionTypes) => {
  if (action.type !== FirebaseAction.Types.SUBSCRIBE_DOC) return next(action);

  next(action);
};

export const firebaseMiddleware = [loadDoc, subscribeDoc];
