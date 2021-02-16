export enum Types {
  // SETTERS
  SET_MODE = '[Auth] set auth mode',
  SET_GUEST_TIMESTAMP = '[Auth] set timestamp for guest user',
  SET_GUEST_TIMESTAMP_VALID = '[Auth] set isTimestampValid for guest user ',
  // COMMANDS
  POPULATE = '[Auth] populate',
  RENEW_GUEST_TIMESTAMP = '[Auth] renew timestamp',
  INIT_GUEST_TIMESTAMP_OBSERVER = '[Auth] init timestamp observer',
  REGISTER_GUEST_TIMESTAMP = '[Auth] register guest timestamp',
  PERSIST_GUEST_TIMESTAMP_LOCALSTORAGE = '[Auth] persist guest user timestamp to localstorage',
  RETRIEVE_GUEST_TIMESTAMP_LOCALSTORAGE = '[Auth] retrieve guest timestamp from localstorage',
}

/**
 *
 */
interface setAuthModeAction {
  type: Types.SET_MODE;
  payload: {
    mode: 'guest' | 'auth';
  };
}
export const setAuthMode = (newMode: 'guest' | 'auth') => {
  return {
    type: Types.SET_MODE,
    payload: { mode: newMode },
  };
};

/**
 *
 */
interface setGuestTimestampAction {
  type: Types.SET_GUEST_TIMESTAMP;
  payload: {
    timestamp: number;
  };
}
export const setGuestTimestamp = (timestamp?: number) => {
  return {
    type: Types.SET_GUEST_TIMESTAMP,
    payload: {
      timestamp: timestamp,
    },
  };
};

/**
 *
 */
interface setGuestIsTimestampValidAction {
  type: Types.SET_GUEST_TIMESTAMP_VALID;
  payload: {
    isValid: boolean;
  };
}
export const setGuestIsTimestampValid = (isValid: boolean) => {
  return {
    type: Types.SET_GUEST_TIMESTAMP_VALID,
    payload: {
      isValid: isValid,
    },
  };
};

/**
 *
 */
interface renewGuestTimestampAction {
  type: Types.RENEW_GUEST_TIMESTAMP;
  meta: {
    throttle: number;
  };
}
export const renewGuestTimestamp = () => {
  return {
    type: Types.RENEW_GUEST_TIMESTAMP,
    meta: {
      throttle: 5000,
    },
  };
};

/**
 *
 */
interface initGuestTimestampObserverAction {
  type: Types.INIT_GUEST_TIMESTAMP_OBSERVER;
}
export const initGuestTimestampObserver = () => {
  return {
    type: Types.INIT_GUEST_TIMESTAMP_OBSERVER,
  };
};

/**
 *
 */
interface persistGuestTimestampLocalstorageAction {
  type: Types.PERSIST_GUEST_TIMESTAMP_LOCALSTORAGE;
}
export const persistGuestTimestampLocalstorage = () => {
  return {
    type: Types.PERSIST_GUEST_TIMESTAMP_LOCALSTORAGE,
  };
};

/**
 *
 */
interface retrieveGuestTimestampLocalstorageAction {
  type: Types.RETRIEVE_GUEST_TIMESTAMP_LOCALSTORAGE;
}
export const retrieveGuestTimestampLocalstorage = () => {
  return {
    type: Types.RETRIEVE_GUEST_TIMESTAMP_LOCALSTORAGE,
  };
};

/**
 *
 */
interface registerGuestTimestampAction {
  type: Types.REGISTER_GUEST_TIMESTAMP;
}
export const registerGuestTimestamp = () => {
  return {
    type: Types.REGISTER_GUEST_TIMESTAMP,
  };
};

/**
 *
 */
interface populateAuthAction {
  type: Types.POPULATE;
}
export const populateAuth = () => {
  return {
    type: Types.POPULATE,
  };
};

export type ActionTypes =
  | setAuthModeAction
  | setGuestTimestampAction
  | setGuestIsTimestampValidAction
  | renewGuestTimestampAction
  | initGuestTimestampObserverAction
  | persistGuestTimestampLocalstorageAction
  | retrieveGuestTimestampLocalstorageAction
  | registerGuestTimestampAction
  | populateAuthAction;
