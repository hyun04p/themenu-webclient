import { ActionCreator } from '@redux/Types';

export enum Types {
  // SETTERS
  SET_MODE = '[Auth] set auth mode',
  SET_GUEST_TIMESTAMP = '[Auth] set timestamp for guest user',
  SET_GUEST_TIMESTAMP_VALID = '[Auth] set isTimestampValid for guest user ',
  SET_LOADING = '[Auth] set loading',
  // COMMANDS
  POPULATE = '[Auth] populate',
  RENEW_GUEST_TIMESTAMP = '[Auth] renew timestamp',
  INIT_GUEST_TIMESTAMP_OBSERVER = '[Auth] init timestamp observer',
  DESTROY_GUEST_TIMESTAMP_OBSERVER = '[Auth] destroy timestamp observer',
  AUTHENTICATE_GUEST = '[Auth] authenticate guest',
  REGISTER_GUEST_TIMESTAMP = '[Auth] register guest timestamp',
  PERSIST_GUEST_TIMESTAMP_LOCALSTORAGE = '[Auth] persist guest user timestamp to localstorage',
  RETRIEVE_GUEST_TIMESTAMP_LOCALSTORAGE = '[Auth] retrieve guest timestamp from localstorage',
}

export const setAuthMode: ActionCreator<{ newMode: 'guest' | 'auth' }> = (
  newMode
) => {
  return {
    type: Types.SET_MODE,
    payload: { mode: newMode },
  };
};

export const setGuestTimestamp: ActionCreator<{ timestamp: string }> = (
  param
) => {
  return {
    type: Types.SET_GUEST_TIMESTAMP,
    payload: {
      timestamp: param.timestamp,
    },
  };
};

export const setGuestIsTimestampValid: ActionCreator<{
  isValid: boolean;
}> = (param) => {
  return {
    type: Types.SET_GUEST_TIMESTAMP_VALID,
    payload: {
      isValid: param.isValid,
    },
  };
};

export const renewGuestTimestamp: ActionCreator<void> = () => {
  return {
    type: Types.RENEW_GUEST_TIMESTAMP,
    payload: null,
  };
};

export const initGuestTimestampObserver: ActionCreator<void> = () => {
  return {
    type: Types.INIT_GUEST_TIMESTAMP_OBSERVER,
    payload: null,
  };
};

export const destroyGuestTimestampObserver: ActionCreator<void> = () => {
  return {
    type: Types.DESTROY_GUEST_TIMESTAMP_OBSERVER,
    payload: null,
  };
};

export const setLoading: ActionCreator<{ loading: boolean }> = (param) => {
  return {
    type: Types.SET_LOADING,
    payload: {
      loading: param.loading,
    },
  };
};

export const authenticateGuest: ActionCreator<{ info: any }> = (param) => {
  return {
    type: Types.AUTHENTICATE_GUEST,
    payload: param.info,
  };
};

export const persistGuestTimestampLocalstorage: ActionCreator<void> = () => {
  return {
    type: Types.PERSIST_GUEST_TIMESTAMP_LOCALSTORAGE,
    payload: null,
  };
};

export const retrieveGuestTimestampLocalstorage: ActionCreator<void> = () => {
  return {
    type: Types.RETRIEVE_GUEST_TIMESTAMP_LOCALSTORAGE,
    payload: null,
  };
};

export const registerGuestTimestamp: ActionCreator<void> = () => {
  return {
    type: Types.REGISTER_GUEST_TIMESTAMP,
    payload: null,
  };
};

export const populateAuth: ActionCreator<void> = () => {
  return {
    type: Types.POPULATE,
    payload: null,
  };
};
