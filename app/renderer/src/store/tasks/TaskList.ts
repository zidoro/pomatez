import { Task, TaskList } from "./types";
import { v4 as uuid } from "uuid";

type CreateTaskListParams = Pick<TaskList, "title" | "priority">;

export const createTaskList = ({
  title,
  priority,
}: CreateTaskListParams): TaskList => {
  return {
    _id: uuid(),
    title,
    cards: [],
    priority,
  };
};

export const addTaskToList = (
  taskList: TaskList,
  task: Task
): TaskList => {
  return {
    ...taskList,
    cards: [...taskList.cards, task],
  };
};

export const removeTaskFromList = (
  taskList: TaskList,
  taskId: string
): TaskList => {
  return {
    ...taskList,
    cards: taskList.cards.filter((task) => task._id !== taskId),
  };
};

export const setListPriority = (
  taskList: TaskList,
  priority: boolean
): TaskList => {
  return { ...taskList, priority };
};
