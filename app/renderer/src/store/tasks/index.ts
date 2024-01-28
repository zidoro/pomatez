import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "utils";
import type { Task, TaskList, ListPayload } from "./types";
import undoable from "redux-undo";
import {
  addTaskToList,
  createTaskList,
  removeTaskFromList,
  editTaskList,
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
    addTaskList: (state, action: ListPayload<"title">) => {
      const priority = state.length === 0 ? true : false;

      const title = action.payload.trim().toUpperCase();

      const taskList = createTaskList({ title, priority });

      return [...state, taskList];
    },

    removeTaskList: (state, action: ListPayload<"_id">) => {
      return state.filter((list) => list._id !== action.payload);
    },

    setTaskListPriority: (state, action: ListPayload<"_id">) => {
      const newState = state.map((list) => {
        if (list._id !== action.payload) {
          return editTaskList(list, { priority: false });
        }

        return editTaskList(list, { priority: true });
      });

      return newState;
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
          const title = action.payload.listTitle.trim().toUpperCase();

          return editTaskList(list, { title });
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
      const text = action.payload.cardText.trim().capitalize();

      const newTask = createTask({ text });

      const newState = state.map((list) => {
        if (list._id === action.payload.listId) {
          return addTaskToList(list, newTask);
        }
        return list;
      });

      return newState;
    },

    editTaskCardText: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        cardId: Task["_id"];
        cardText: Task["text"];
      }>
    ) => {
      const newState = state.map((list) => {
        if (list._id !== action.payload.listId) return list;

        const newCards = list.cards.map((card) => {
          if (card._id !== action.payload.cardId) return card;

          const text = action.payload.cardText.trim().capitalize();

          return editTask(card, { text });
        });

        return { ...list, cards: newCards };
      });

      return newState;
    },

    editTaskCard: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        cardId: Task["_id"];
        description?: Task["description"];
      }>
    ) => {
      const newState = state.map((list) => {
        if (list._id !== action.payload.listId) return list;

        const newCards = list.cards.map((card) => {
          if (card._id !== action.payload.cardId) return card;

          const description =
            action.payload.description?.capitalize() || "";

          return editTask(card, { description });
        });

        return { ...list, cards: newCards };
      });

      return newState;
    },

    removeTaskCard: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        cardId: Task["_id"];
      }>
    ) => {
      const newState = state.map((list) => {
        if (list._id !== action.payload.listId) return list;

        return removeTaskFromList(list, action.payload.cardId);
      });

      return newState;
    },

    setTaskCardDone: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        cardId?: Task["_id"];
      }>
    ) => {
      if (!action.payload.cardId) return state;

      const newState = state.map((list) => {
        if (list._id !== action.payload.listId) return list;

        const newCards = list.cards.map((card) => {
          if (card._id !== action.payload.cardId) return card;

          return editTask(card, { done: true });
        });

        return { ...list, cards: newCards };
      });

      return newState;
    },

    setTaskCardNotDone: (
      state,
      action: PayloadAction<{
        listId: TaskList["_id"];
        cardId?: Task["_id"];
      }>
    ) => {
      if (!action.payload.cardId) return;

      const newState = state.map((list) => {
        if (list._id !== action.payload.listId) return list;

        const newCards = list.cards.map((card) => {
          if (card._id !== action.payload.cardId) return card;

          return editTask(card, { done: false });
        });

        return { ...list, cards: newCards };
      });

      return newState;
    },

    skipTaskCard: (state, action: ListPayload<"_id">) => {
      const newState = state.map((list) => {
        if (list._id !== action.payload) return list;

        const doneCards = list.cards.filter((card) => card.done);
        const notDoneCards = list.cards.filter((card) => !card.done);

        const firstNotDoneCard = notDoneCards.at(0);

        if (!firstNotDoneCard) return list;

        const newNotDoneCards = notDoneCards.filter(
          (card) => card._id !== firstNotDoneCard._id
        );

        return {
          ...list,
          cards: [...newNotDoneCards, firstNotDoneCard, ...doneCards],
        };
      });

      return newState;
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
