const tasks = "[tasks]";

export type CardTypes = {
  _id: string;
  text: string;
  description: string;
  done: boolean;
};

export type TaskTypes = {
  _id: string;
  title: string;
  cards: CardTypes[];
  priority: boolean;
};

export const ADD_TASK_LIST = `${tasks} ADD_TASK_LIST`;
export const REMOVE_TASK_LIST = `${tasks} REMOVE_TASK_LIST`;
export const SET_TASK_LIST_PRIORITY = `${tasks} SET_TASK_LIST_PRIORITY`;

export const EDIT_TASK_TITLE = `${tasks} EDIT_TASK_TITLE`;

export const DRAG_LIST = `${tasks} DRAG_LIST`;

export const ADD_TASK_CARD = `${tasks} ADD_TASK_CARD`;
export const REMOVE_TASK_CARD = `${tasks} REMOVE_TASK_CARD`;

export const EDIT_TASK_CARD_TEXT = `${tasks} EDIT_TASK_CARD_TEXT`;
export const EDIT_TASK_CARD_DESCRIPTION = `${tasks} EDIT_TASK_CARD_DESCRIPTION`;

export const SET_TASK_CARD_DONE = `${tasks} SET_TASK_CARD_DONE`;
export const SET_TASK_CARD_NOT_DONE = `${tasks} SET_TASK_CARD_NOT_DONE`;
export const SKIP_TASK_CARD = `${tasks} SKIP_TASK_CARD`;

export type TasksActionTypes = {
  type: typeof SKIP_TASK_CARD;
  payload: any;
};
