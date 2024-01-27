import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "utils";
import type { Task, TaskList, TasksPayload } from "./types";
import undoable from "redux-undo";
import {
  addTaskToList,
  createTaskList,
  setListPriority,
  removeTaskFromList,
} from "./TaskList";
import { createTask, editTask } from "./Task";
export * from "./types";

const tasks =
  (getFromStorage("state") && getFromStorage("state").tasks) || [];

const initialState: TaskList[] = tasks;

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskList: (state, action: TasksPayload<"title">) => {
      const priority = state.length === 0 ? true : false;

      const taskList = createTaskList({
        title: action.payload.trim().toUpperCase(),
        priority,
      });

      state.push(taskList);
    },

    removeTaskList: (state, action: TasksPayload<"_id">) => {
      return state.filter((list) => list._id !== action.payload);
    },

    setTaskListPriority: (state, action: TasksPayload<"_id">) => {
      const listIndex = state.findIndex(
        (list) => list._id === action.payload
      );

      if (listIndex === -1) return;

      state[listIndex] = setListPriority(state[listIndex], true);
    },

    editTaskTitle: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        listTitle: TaskList["title"];
      }>
    ) => {
      return state.map((list) => {
        if (list._id === action.payload.listId) {
          return {
            ...list,
            title: action.payload.listTitle.trim().toUpperCase(),
          };
        }
        return list;
      });
    },

    addTaskCard: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        cardText: Task["text"];
      }>
    ) => {
      const newTask = createTask({
        text: action.payload.cardText.trim().capitalize(),
      });

      const listIndex = state.findIndex(
        (list) => list._id === action.payload.listId
      );

      if (listIndex === -1) return;

      state[listIndex] = addTaskToList(state[listIndex], newTask);
    },

    editTaskCardText: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        cardId: Task["_id"];
        cardText: Task["text"];
      }>
    ) => {
      const listIndex = state.findIndex(
        (list) => list._id === action.payload.listId
      );
      if (listIndex === -1) return state;
      const list = state[listIndex];

      const cardIndex = list.cards.findIndex(
        (card) => card._id === action.payload.cardId
      );

      if (cardIndex === -1) return state;

      const taskToEdit = list.cards[cardIndex];

      const newTask = editTask(taskToEdit, {
        text: action.payload.cardText.trim().capitalize(),
      });

      state[listIndex].cards.splice(cardIndex, 1, newTask);
    },

    editTaskCard: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        cardId: Task["_id"];
        description?: Task["description"];
      }>
    ) => {
      const listIndex = state.findIndex(
        (list) => list._id === action.payload.listId
      );
      if (listIndex === -1) return state;
      const list = state[listIndex];

      const taskIndex = list.cards.findIndex(
        (card) => card._id === action.payload.cardId
      );
      if (taskIndex === -1) return state;
      const oldTask = list.cards[taskIndex];

      const newTask = editTask(oldTask, {
        description: action.payload.description?.capitalize() || "",
      });

      state[listIndex].cards.splice(taskIndex, 1, newTask);
    },

    removeTaskCard: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        cardId: Task["_id"];
      }>
    ) => {
      const listIndex = state.findIndex(
        (list) => list._id === action.payload.listId
      );
      if (listIndex === -1) return;
      const oldTaskList = state[listIndex];

      const newTaskList = removeTaskFromList(
        oldTaskList,
        action.payload.cardId
      );

      state[listIndex] = newTaskList;
    },

    setTaskCardDone: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        cardId?: Task["_id"];
      }>
    ) => {
      if (!action.payload.cardId) return;

      const listIndex = state.findIndex(
        (list) => list._id === action.payload.listId
      );
      if (listIndex === -1) return state;
      const list = state[listIndex];

      const taskIndex = list.cards.findIndex(
        (card) => card._id === action.payload.cardId
      );
      if (taskIndex === -1) return;

      const oldTask = list.cards[taskIndex];

      const newTask = editTask(oldTask, { done: true });

      state[listIndex].cards.splice(taskIndex, 1, newTask);
    },

    setTaskCardNotDone: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        cardId?: Task["_id"];
      }>
    ) => {
      if (!action.payload.cardId) return;

      const listIndex = state.findIndex(
        (list) => list._id === action.payload.listId
      );
      if (listIndex === -1) return;
      const list = state[listIndex];

      const taskIndex = list.cards.findIndex(
        (card) => card._id === action.payload.cardId
      );
      if (taskIndex === -1) return;
      const oldTask = list.cards[taskIndex];

      const newTask = editTask(oldTask, { done: false });

      state[listIndex].cards.splice(taskIndex, 1, newTask);
    },

    skipTaskCard: (state, action: TasksPayload<"_id">) => {
      const listIndex = state.findIndex(
        (list) => list._id === action.payload
      );
      if (listIndex === -1) return;
      const list = state[listIndex];

      if (list.cards.length === 0) return;

      const notDoneCards = list.cards.filter((card) => !card.done);
      const doneCards = list.cards.filter((card) => card.done);

      const firstNotDoneCard = notDoneCards.at(0);

      if (!firstNotDoneCard) return;

      state[listIndex] = {
        ...list,
        cards: [
          // Not done without the old first card
          ...notDoneCards.splice(0, 1),
          // The old first card moved to the end
          firstNotDoneCard,
          // Then the done cards
          ...doneCards,
        ],
      };
    },

    dragList: (
      state,
      action: PayloadAction<{
        sourceId: TaskList["_id"];
        destinationId: TaskList["_id"];
        sourceIndex: number;
        destinationIndex: number;
        draggableId: string;
        type: string;
      }>
    ) => {
      const {
        sourceId,
        destinationId,
        sourceIndex,
        destinationIndex,
        type,
      } = action.payload;

      // dragging list around
      if (type === "list") {
        const list = state.splice(sourceIndex, 1);

        if (list) {
          state.splice(destinationIndex, 0, ...list);
        }

        return;
      }

      // in then same list
      if (sourceId === destinationId) {
        const list = state.find((list) => sourceId === list._id);
        const card = list?.cards.splice(sourceIndex, 1);

        if (card) {
          list?.cards.splice(destinationIndex, 0, ...card);
        }
      } else {
        // find the list where drag happened
        const listStart = state.find((list) => sourceId === list._id);

        // pull out the card from this list
        const card = listStart?.cards.splice(sourceIndex, 1);

        // find the list where drag ended
        const listEnd = state.find(
          (list) => destinationId === list._id
        );

        // put the card in the new list
        if (card) {
          listEnd?.cards.splice(destinationIndex, 0, ...card);
        }
      }

      return;
    },
  },
});

export const {
  addTaskCard,
  addTaskList,
  dragList,
  editTaskCard,
  editTaskCardText,
  editTaskTitle,
  removeTaskCard,
  removeTaskList,
  setTaskCardDone,
  setTaskCardNotDone,
  setTaskListPriority,
  skipTaskCard,
} = tasksSlice.actions;

export default undoable(tasksSlice.reducer);
