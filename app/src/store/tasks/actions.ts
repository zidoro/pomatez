import {
  TaskTypes,
  TasksActionTypes,
  ADD_TASK_LIST,
  CardTypes,
  ADD_TASK_CARD,
  DRAG_LIST,
  EDIT_TASK_TITLE,
  EDIT_TASK_CARD_TEXT,
  EDIT_TASK_CARD_DESCRIPTION,
  REMOVE_TASK_CARD,
  REMOVE_TASK_LIST,
  SET_TASK_LIST_PRIORITY,
  SET_TASK_LIST_DONE,
  SET_TASK_CARD_DONE,
  SKIP_TASK_CARD,
} from "./types";

export const addTaskList = (title: TaskTypes["title"]): TasksActionTypes => {
  return {
    type: ADD_TASK_LIST,
    payload: title,
  };
};

export const removeTaskList = (listId: TaskTypes["_id"]): TasksActionTypes => {
  return {
    type: REMOVE_TASK_LIST,
    payload: listId,
  };
};

export const setTaskListPriority = (
  listId: TaskTypes["_id"]
): TasksActionTypes => {
  return {
    type: SET_TASK_LIST_PRIORITY,
    payload: { listId },
  };
};

export const setTaskListDone = (listId: TaskTypes["_id"]): TasksActionTypes => {
  return {
    type: SET_TASK_LIST_DONE,
    payload: { listId },
  };
};

export const editTaskTitle = (
  listId: TaskTypes["_id"],
  listTitle: TaskTypes["title"]
): TasksActionTypes => {
  return {
    type: EDIT_TASK_TITLE,
    payload: { listId, listTitle },
  };
};

export const addTaskCard = (
  listId: TaskTypes["_id"],
  cardText: CardTypes["text"]
): TasksActionTypes => {
  return {
    type: ADD_TASK_CARD,
    payload: { listId, cardText },
  };
};

export const editTaskCardText = (
  listId: TaskTypes["_id"],
  cardId: CardTypes["_id"],
  cardText: CardTypes["text"]
): TasksActionTypes => {
  return {
    type: EDIT_TASK_CARD_TEXT,
    payload: { listId, cardId, cardText },
  };
};

export const editTaskCard = (
  listId: TaskTypes["_id"],
  cardId: CardTypes["_id"],
  description?: CardTypes["description"]
): TasksActionTypes => {
  return {
    type: EDIT_TASK_CARD_DESCRIPTION,
    payload: { listId, cardId, description },
  };
};

export const removeTaskCard = (
  listId?: TaskTypes["_id"],
  cardId?: CardTypes["_id"]
): TasksActionTypes => {
  return {
    type: REMOVE_TASK_CARD,
    payload: { listId, cardId },
  };
};

export const setTaskCardDone = (
  listId?: TaskTypes["_id"],
  cardId?: CardTypes["_id"]
): TasksActionTypes => {
  return {
    type: SET_TASK_CARD_DONE,
    payload: { listId, cardId },
  };
};

export const skipTaskCard = (listId?: TaskTypes["_id"]): TasksActionTypes => {
  return {
    type: SKIP_TASK_CARD,
    payload: { listId },
  };
};

export const dragList = (
  sourceId: string,
  destinationId: string,
  sourceIndex: number,
  destinationIndex: number,
  draggableId: string,
  type: string
): TasksActionTypes => {
  return {
    type: DRAG_LIST,
    payload: {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex,
      draggableId,
      type,
    },
  };
};
