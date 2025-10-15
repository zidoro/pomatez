import { v4 as uuid } from "uuid";
import type { Task } from "../types";

type CreateTaskParams = Pick<Task, "text"> &
  Partial<Pick<Task, "description">>;
type EditableTaskParams = Partial<Omit<Task, "_id">>;

export const createTask = ({
  text,
  description = "",
}: CreateTaskParams): Task => {
  return {
    _id: uuid(),
    text,
    description,
    done: false,
  };
};

export const editTask = (
  task: Task,
  changedFields: EditableTaskParams
): Task => {
  return { ...task, ...changedFields };
};
