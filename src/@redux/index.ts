import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import AppMiddleware from './middleware/app';
import UIReducer, { UI } from './reducers/UIReducer';
import AuthReducer, { Auth } from './reducers/AuthReducer';
import OrderReducer, { Order } from './reducers/OrderReducer';

const reducer = combineReducers({
  UI: UIReducer,
  Auth: AuthReducer,
  Order: OrderReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...AppMiddleware))
);

export interface RootState {
  UI: UI;
  Auth: Auth;
  Order: Order;
}

export default store;
