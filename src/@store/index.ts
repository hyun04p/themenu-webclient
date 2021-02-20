import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from '@store/middleware';
import reducer, { RootState } from '@store/reducers';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type { RootState };
export default store;
