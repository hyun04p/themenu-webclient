import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import AppMiddleware from './middleware/app';
import UIReducer, { UI } from './reducers/UIReducer';
import AuthReducer, { Auth } from './reducers/AuthReducer';

const reducer = combineReducers({
  UI: UIReducer,
  Auth: AuthReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...AppMiddleware))
);

export interface RootState {
  UI: UI;
  Auth: Auth;
}

export default store;
