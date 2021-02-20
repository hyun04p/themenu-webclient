import { ActionCreator } from '@store/Types';
import { TypeFormatFlags } from 'typescript';

export enum Types {
  // SETTERS
  BEGIN_ROUTING = '[UI] begin routing set isRouting true',
  FINISH_ROUTING = '[UI] finish routing set isRouting false',
  SET_GLOBAL_LOADING = '[UI] set global loading',
  QUEUE_NOTIFICATION = '[UI] queue notification',
  POP_NOTIFICATION = '[UI] pop notification',
  ROUTE_TO = '[UI] route to',
}

export const setGlobalLoading = (isLoading: boolean) => {
  return {
    type: Types.SET_GLOBAL_LOADING,
    payload: {
      isLoading: isLoading,
    },
  };
};

/**
 *
 */
interface queueNotificationAction {
  type: Types.QUEUE_NOTIFICATION;
  payload: {
    notification: {
      title: string;
      content: string;
    };
  };
}
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

/**
 *
 */
interface popNotificationAction {
  type: Types.POP_NOTIFICATION;
}
export const popNotification = () => {
  return {
    type: Types.POP_NOTIFICATION,
  };
};

/**
 *
 */
interface routeToAction {
  type: Types.ROUTE_TO;
  payload: { to: string; history: any };
}
export const routeTo = (to: string, history: any) => {
  return {
    type: Types.ROUTE_TO,
    payload: {
      to: to,
      history: history,
    },
  };
};

/**
 *
 */
interface beginRoutingAction {
  type: Types.BEGIN_ROUTING;
}
export const beginRouting = () => {
  return {
    type: Types.BEGIN_ROUTING,
  };
};

/**
 *
 */
interface finishRoutingAction {
  type: Types.FINISH_ROUTING;
}
export const finishRouting = () => {
  return {
    type: Types.FINISH_ROUTING,
  };
};

export type ActionTypes =
  | queueNotificationAction
  | routeToAction
  | popNotificationAction
  | beginRoutingAction
  | finishRoutingAction;
