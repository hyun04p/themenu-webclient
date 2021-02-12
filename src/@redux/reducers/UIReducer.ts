import { UIAction } from '@redux/actions';
import { Action, Reducer } from '@redux/Types';

interface Notification {
  title: string;
  content: string;
}

export interface UI {
  isGlobalLoading: boolean;
  notificationQueue: Notification[];
}

const initialState: UI = {
  isGlobalLoading: true,
  notificationQueue: [],
};

const UIReducer: Reducer<UI> = (state = initialState, action) => {
  switch (action.type) {
    case UIAction.Types.SET_GLOBAL_LOADING:
      return {
        ...state,
        isGlobalLoading: action.payload.isLoading,
      };

    default:
      return state;
  }
};

export default UIReducer;
