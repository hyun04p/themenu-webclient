import { ActionCreator } from '@store/Types';

export enum Types {
  LOAD_DOC = '[Firebase] load doc',
  SUBSCRIBE_DOC = '[Firebase] subscribe doc',
}

interface loadDocAction {
  type: Types.LOAD_DOC;
}
export const loadDoc = (): loadDocAction => {
  return {
    type: Types.LOAD_DOC,
  };
};

interface subscribeDocAction {
  type: Types.SUBSCRIBE_DOC;
}
export const subscribeDoc = (): subscribeDocAction => {
  return {
    type: Types.SUBSCRIBE_DOC,
  };
};
// SETTERS

// COMMANDs

// QUERIES

export type ActionTypes = loadDocAction | subscribeDocAction;
