const tasks = "[tasks]";

export type CardTypes = {
  _id: string;
  text: string;
  description: string;
};

export type TaskTypes = {
  _id: string;
  title: string;
  cards: CardTypes[];
  priority: boolean;
  done: boolean;
};

export const ADD_TASK_LIST = `${tasks} ADD_TASK_LIST`;
export const REMOVE_TASK_LIST = `${tasks} REMOVE_TASK_LIST`;
export const SET_TASK_LIST_PRIORITY = `${tasks} SET_TASK_LIST_PRIORITY`;
export const SET_TASK_LIST_DONE = `${tasks} SET_TASK_LIST_DONE`;

export const EDIT_TASK_TITLE = `${tasks} EDIT_TASK_TITLE`;

export const DRAG_LIST = `${tasks} DRAG_LIST`;

export const ADD_TASK_CARD = `${tasks} ADD_TASK_CARD`;
export const REMOVE_TASK_CARD = `${tasks} REMOVE_TASK_CARD`;

export const EDIT_TASK_CARD_TEXT = `${tasks} EDIT_TASK_CARD_TEXT`;
export const EDIT_TASK_CARD_DESCRIPTION = `${tasks} EDIT_TASK_CARD_DESCRIPTION`;

interface AddTaskList {
  type: typeof ADD_TASK_LIST;
  payload: any;
}

interface RemoveTaskList {
  type: typeof REMOVE_TASK_LIST;
  payload: any;
}

interface SetTaskListPriority {
  type: typeof SET_TASK_LIST_PRIORITY;
  payload: any;
}

interface SetTaskListDone {
  type: typeof SET_TASK_LIST_DONE;
  payload: any;
}

interface EditTaskTitle {
  type: typeof EDIT_TASK_TITLE;
  payload: any;
}

interface AddTaskCard {
  type: typeof ADD_TASK_CARD;
  payload: any;
}

interface EditTaskCardText {
  type: typeof EDIT_TASK_CARD_TEXT;
  payload: any;
}

interface DragList {
  type: typeof DRAG_LIST;
  payload: any;
}

interface EditTaskCard {
  type: typeof EDIT_TASK_CARD_DESCRIPTION;
  payload: any;
}

interface RemoveTaskCard {
  type: typeof REMOVE_TASK_CARD;
  payload: any;
}

export type TasksActionTypes =
  | AddTaskList
  | RemoveTaskList
  | AddTaskCard
  | DragList
  | EditTaskTitle
  | EditTaskCardText
  | EditTaskCard
  | RemoveTaskCard
  | SetTaskListPriority
  | SetTaskListDone;
