import { UIAction } from '@redux/actions';
import { Action, Reducer } from '@redux/Types';

interface Notification {
  title: string;
  content: string;
}

export interface UI {
  isGlobalLoading: boolean;
  isRouting: boolean;
  notificationQueue: Notification[];
}

const initialState: UI = {
  isGlobalLoading: true,
  isRouting: false,
  notificationQueue: [],
};

const UIReducer = (state = initialState, action: Action): UI => {
  const { payload } = action;

  switch (action.type) {
    case UIAction.Types.SET_GLOBAL_LOADING:
      return {
        ...state,
        isGlobalLoading: payload.isLoading,
      };

    case UIAction.Types.QUEUE_NOTIFICATION:
      return {
        ...state,
        notificationQueue: [payload.notification, ...state.notificationQueue],
      };

    case UIAction.Types.POP_NOTIFICATION:
      const newQueue = [...state.notificationQueue];
      newQueue.pop();
      return {
        ...state,
        notificationQueue: newQueue,
      };

    case UIAction.Types.BEGIN_ROUTING:
      return {
        ...state,
        isRouting: true,
      };

    case UIAction.Types.FINISH_ROUTING:
      return {
        ...state,
        isRouting: false,
      };

    default:
      return state;
  }
};

export default UIReducer;
