import { combineReducers } from 'redux';
import AuthReducer, { Auth } from './AuthReducer';
import OrderReducer, { Order } from './OrderReducer';
import UIReducer, { UI } from './UIReducer';

const reducer = combineReducers({
  UI: UIReducer,
  Auth: AuthReducer,
  Order: OrderReducer,
});

// export interface RootState {
//   UI: UI;
//   Auth: Auth;
//   Order: Order;
// }

export type RootState = ReturnType<typeof reducer>;

export default reducer;
