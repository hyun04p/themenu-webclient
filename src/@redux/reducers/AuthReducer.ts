import { AuthAction } from '@redux/actions';
import { act } from 'react-dom/test-utils';

export interface Auth {
  mode: 'guest' | 'auth';
  guest: {
    timestamp: number;
    isTimestampValid: boolean;
  };
}

const initialState: Auth = {
  mode: 'guest',
  guest: {
    timestamp: -1,
    isTimestampValid: false,
  },
};

/**
 * @AuthRudcer
 */
const AuthReducer = (
  state = initialState,
  action: AuthAction.ActionTypes
): Auth => {
  console.log('auth reducer', action.type);
  switch (action.type) {
    case AuthAction.Types.SET_GUEST_TIMESTAMP:
      console.log('new timestamp: ', action.payload.timestamp);
      return {
        ...state,
        guest: {
          ...state.guest,
          timestamp: action.payload.timestamp,
        },
      };

    case AuthAction.Types.SET_GUEST_TIMESTAMP_VALID:
      return {
        ...state,
        guest: {
          ...state.guest,
          isTimestampValid: action.payload.isValid,
        },
      };

    default:
      return state;
  }
};

export default AuthReducer;
