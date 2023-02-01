import { v4 as uuid } from "uuid";
import { getFromStorage } from "utils";
import {
  TaskTypes,
  TasksActionTypes,
  ADD_TASK_LIST,
  ADD_TASK_CARD,
  DRAG_LIST,
  EDIT_TASK_TITLE,
  EDIT_TASK_CARD_TEXT,
  EDIT_TASK_CARD_DESCRIPTION,
  REMOVE_TASK_CARD,
  REMOVE_TASK_LIST,
  SET_TASK_LIST_PRIORITY,
  CardTypes,
  SET_TASK_CARD_DONE,
  SKIP_TASK_CARD,
  SET_TASK_CARD_NOT_DONE,
} from "./types";
import undoable from "redux-undo";

const tasks =
  (getFromStorage("state") && getFromStorage("state").tasks) || [];

const initialState: TaskTypes[] = tasks;

const tasksReducer = (
  state = initialState,
  action: TasksActionTypes
) => {
  switch (action.type) {
    case ADD_TASK_LIST: {
      const isPriority = state.length === 0 ? true : false;
      const newList: TaskTypes = {
        _id: uuid(),
        title: action.payload.trim().toUpperCase(),
        cards: [],
        priority: isPriority,
      };

      const newState = [...state, newList];

      return newState;
    }
    case REMOVE_TASK_LIST: {
      const newState = state.filter((list) => {
        return list._id !== action.payload;
      });

      return newState;
    }
    case EDIT_TASK_TITLE: {
      const newState = state.map((list) => {
        if (list._id === action.payload.listId) {
          return {
            ...list,
            title: action.payload.listTitle.trim().toUpperCase(),
          };
        }
        return list;
      });

      return newState;
    }
    case SET_TASK_LIST_PRIORITY: {
      const newState = state.map((list) => {
        if (list._id === action.payload.listId) {
          return { ...list, priority: true };
        }

        return { ...list, priority: false };
      });

      newState.sort((a, b) => (a.priority > b.priority ? -1 : 1));

      return newState;
    }
    case ADD_TASK_CARD: {
      const newCard: CardTypes = {
        _id: uuid(),
        text: action.payload.cardText.trim().capitalize(),
        description: "",
        done: false,
      };

      const newState = state.map((list) => {
        if (list._id === action.payload.listId) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        }
        return list;
      });

      return newState;
    }
    case EDIT_TASK_CARD_TEXT: {
      const newState = state.map((list) => {
        if (list._id === action.payload.listId) {
          const newCards = list.cards.map((card) => {
            if (card._id === action.payload.cardId) {
              return {
                ...card,
                text: action.payload.cardText.trim().capitalize(),
              };
            }
            return card;
          });
          return { ...list, cards: newCards };
        }
        return list;
      });

      return newState;
    }
    case EDIT_TASK_CARD_DESCRIPTION: {
      const newState = state.map((list) => {
        if (list._id === action.payload.listId) {
          const newCards = list.cards.map((card) => {
            if (card._id === action.payload.cardId) {
              return {
                ...card,
                description: action.payload.description.capitalize(),
              };
            }
            return card;
          });
          return { ...list, cards: newCards };
        }
        return list;
      });

      return newState;
    }
    case REMOVE_TASK_CARD: {
      const newState = state.map((list) => {
        if (list._id === action.payload.listId) {
          const newCards = list.cards.filter(
            (card) => card._id !== action.payload.cardId
          );
          return { ...list, cards: newCards };
        }
        return list;
      });

      return newState;
    }
    case SET_TASK_CARD_DONE: {
      const newState = state.map((list) => {
        if (list._id === action.payload.listId) {
          const cards = list.cards.map((card) => {
            if (card._id === action.payload.cardId) {
              return {
                ...card,
                done: true,
              };
            }
            return card;
          });

          const firstCard = cards.shift();

          return {
            ...list,
            cards: [...cards, firstCard],
          };
        }
        return list;
      });

      return newState;
    }
    case SET_TASK_CARD_NOT_DONE: {
      const newState = state.map((list) => {
        if (list._id === action.payload.listId) {
          const cards = list.cards.map((card) => {
            if (card._id === action.payload.cardId) {
              return {
                ...card,
                done: false,
              };
            }
            return card;
          });

          return { ...list, cards };
        }
        return list;
      });

      return newState;
    }
    case SKIP_TASK_CARD: {
      const newState = state.map((list) => {
        if (list._id === action.payload.listId) {
          const notDoneCards = list.cards
            .filter((card) => !card.done)
            .map((card) => card);

          const firstNotDoneCard = notDoneCards.shift();

          const doneCards = list.cards
            .filter((card) => card.done)
            .map((card) => card);

          return {
            ...list,
            cards: [...notDoneCards, firstNotDoneCard, ...doneCards],
          };
        }
        return list;
      });

      return newState;
    }
    case DRAG_LIST: {
      const {
        sourceId,
        destinationId,
        sourceIndex,
        destinationIndex,
        type,
      } = action.payload;

      const newState = [...state];

      // dragging list around
      if (type === "list") {
        const list = newState.splice(sourceIndex, 1);

        if (list) {
          newState.splice(destinationIndex, 0, ...list);
        }

        return newState;
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

      return newState;
    }
    default:
      return state;
  }
};

export const undoableTasksReducer = undoable<
  TaskTypes[],
  TasksActionTypes
>(tasksReducer as any);
