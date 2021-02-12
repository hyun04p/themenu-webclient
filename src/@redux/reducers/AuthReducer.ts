import { AuthAction } from '@redux/actions';
import { Action, Reducer } from '@redux/Types';

export interface Auth {
  mode: 'guest' | 'auth';
  loading: boolean;
  guest: {
    timestamp: string;
    isTimestampValid: boolean;
    observerId: number;
  };
}

const initialState: Auth = {
  mode: 'guest',
  loading: true,
  guest: {
    timestamp: '',
    isTimestampValid: false,
    observerId: -1,
  },
};

const AuthReducer: Reducer<Auth> = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case AuthAction.Types.SET_GUEST_TIMESTAMP:
      return {
        ...state,
        guest: {
          ...state.guest,
          timestamp: payload.timestamp,
        },
      };

    case AuthAction.Types.SET_GUEST_TIMESTAMP_VALID:
      return {
        ...state,
        guest: {
          ...state.guest,
          isTimestampValid: payload.isValid,
        },
      };

    case AuthAction.Types.SET_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };

    default:
      return state;
  }
};

export default AuthReducer;
