import { ActionCreator } from '@redux/Types';

export enum Types {
  // SETTERS
  SET_GLOBAL_LOADING = '[UI] set global loading',
  QUEUE_NOTIFICATION = '[UI] queue notification',
  POP_NOTIFICATION = '[UI] pop notification',
}

export const setGlobalLoading = (isLoading: boolean) => {
  return {
    type: Types.SET_GLOBAL_LOADING,
    payload: {
      isLoading: isLoading,
    },
  };
};

export const queueNotification: ActionCreator<{
  notification: { title: string; content: string };
}> = (param) => {
  return {
    type: Types.QUEUE_NOTIFICATION,
    payload: {
      notification: param.notification,
    },
  };
};

export const popNotification: ActionCreator<void> = () => {
  return {
    type: Types.POP_NOTIFICATION,
    payload: null,
  };
};
