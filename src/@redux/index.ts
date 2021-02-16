import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import middleware from '@redux/middleware';
import reducer, { RootState } from '@redux/reducers';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type { RootState };
export default store;
