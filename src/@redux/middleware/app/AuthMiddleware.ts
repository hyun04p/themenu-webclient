import { RootState } from '@redux';
import { Action } from '@redux/Types';
import { AuthAction } from '@redux/actions';

interface param {
  dispatch: any;
  getState: () => RootState;
}

const TIMESTAMP_VALID_FOR = 0.5;
enum LocalStorageKey {
  GUEST_TIME_STAMP = 'guesttimestamp',
}

const AuthMiddleware = ({ dispatch, getState }: param) => (next: any) => (
  action: Action
) => {
  next(action);

  /**
   *
   */
  if (AuthAction.Types.AUTHENTICATE_GUEST === action.type) {
    // Authenticate
    // update store if authenticated
    dispatch(AuthAction.registerGuestTimestamp());
  }

  /**
   *
   */
  if (AuthAction.Types.POPULATE === action.type) {
    dispatch(AuthAction.retrieveGuestTimestampLocalstorage());
  }

  /**
   *
   */
  if (AuthAction.Types.REGISTER_GUEST_TIMESTAMP === action.type) {
    const now = new Date();
    dispatch(AuthAction.setGuestTimestamp({ timestamp: now.toISOString() }));
    dispatch(AuthAction.setGuestIsTimestampValid({ isValid: true }));
    dispatch(AuthAction.persistGuestTimestampLocalstorage());
    dispatch(AuthAction.initGuestTimestampObserver());
  }

  /**
   *
   */
  if (AuthAction.Types.RENEW_GUEST_TIMESTAMP === action.type) {
    const now = new Date();

    if (getState().Auth.guest.isTimestampValid) {
      dispatch(AuthAction.setGuestTimestamp({ timestamp: now.toISOString() }));
      dispatch(AuthAction.persistGuestTimestampLocalstorage());
    }
  }

  /**
   *
   */
  if (AuthAction.Types.PERSIST_GUEST_TIMESTAMP_LOCALSTORAGE === action.type) {
    const guest = getState().Auth.guest;
    if (guest.isTimestampValid)
      localStorage.setItem(LocalStorageKey.GUEST_TIME_STAMP, guest.timestamp);
  }

  /**
   *
   */
  if (AuthAction.Types.RETRIEVE_GUEST_TIMESTAMP_LOCALSTORAGE === action.type) {
    const retrievedTimestamp = localStorage.getItem(
      LocalStorageKey.GUEST_TIME_STAMP
    );

    // If timestamp field exists in localstorage
    if (retrievedTimestamp !== null) {
      const now = new Date();
      const timestamp = new Date(retrievedTimestamp);
      const validUntil = new Date(
        timestamp.getTime() + TIMESTAMP_VALID_FOR * 60000
      );
      // retrieved timestamp is valid
      if (validUntil.getTime() > now.getTime()) {
        dispatch(
          AuthAction.setGuestTimestamp({ timestamp: timestamp.toISOString() })
        );
        dispatch(AuthAction.setGuestIsTimestampValid({ isValid: true }));
        dispatch(AuthAction.initGuestTimestampObserver());
      } else {
        localStorage.removeItem(LocalStorageKey.GUEST_TIME_STAMP);
      }
    }
  }

  /**
   *
   */
  if (AuthAction.Types.INIT_GUEST_TIMESTAMP_OBSERVER === action.type) {
    const id = setInterval(() => {
      const timestamp = new Date(getState().Auth.guest.timestamp);
      const now = new Date();
      const validUntil = new Date(
        timestamp.getTime() + TIMESTAMP_VALID_FOR * 60000
      );
      console.log('observing');
      const isTimestampValid = getState().Auth.guest.isTimestampValid;

      if (now.getTime() < validUntil.getTime()) {
        if (!isTimestampValid) {
          dispatch(AuthAction.setGuestIsTimestampValid({ isValid: true }));
        }
      }
      // Timestamp no longer valid => set isValid false and
      else {
        dispatch(AuthAction.setGuestIsTimestampValid({ isValid: false }));
        dispatch(AuthAction.setGuestTimestamp({ timestamp: '' }));
        localStorage.removeItem(LocalStorageKey.GUEST_TIME_STAMP);
        clearInterval(id);
      }
    }, 2000);
  }
};

export default AuthMiddleware;
