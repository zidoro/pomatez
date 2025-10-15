import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { ActionCreators as UndoActionCreator } from "redux-undo";
import {
  DragDropContext,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import {
  StyledTaskContainer,
  StyledTaskStickySection,
  StyledTaskWrapper,
  StyledTaskMain,
} from "styles";
import { addTaskList, dragList } from "store";

import TaskFormButton from "./TaskFormButton";
import TaskInnerList from "./TaskInnerList";

export default function Tasks() {
  const tasks = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();

  const onListAdd = (value: string) => dispatch(addTaskList(value));

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    dispatch(
      dragList({
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        draggableId,
        type,
      })
    );
  };

  useEffect(() => {
    function registerUndoRedoKeys(e: KeyboardEvent) {
      const activeElement = document.activeElement?.tagName;

      if (activeElement !== "INPUT" && activeElement !== "TEXTAREA") {
        if (e.ctrlKey && e.code === "KeyZ") {
          if (tasks.past.length > 0) {
            // @ts-ignore This is a problem with redux-undo types
            dispatch(UndoActionCreator.undo());
          }
        }

        if (e.ctrlKey && e.shiftKey && e.code === "KeyZ") {
          if (tasks.future.length > 0) {
            // @ts-ignore This is a problem with redux-undo types
            dispatch(UndoActionCreator.redo());
          }
        }
      }
    }

    document.addEventListener("keydown", registerUndoRedoKeys);
    return () =>
      document.removeEventListener("keydown", registerUndoRedoKeys);
  }, [dispatch, tasks.past.length, tasks.future.length]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledTaskMain>
        <StyledTaskContainer>
          <Droppable
            droppableId="task-list"
            direction="vertical"
            type="list"
          >
            {(provided) => (
              <StyledTaskWrapper
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <TaskInnerList tasks={tasks.present} />

                {provided.placeholder}

                <StyledTaskStickySection>
                  <TaskFormButton forList onSubmit={onListAdd} />
                </StyledTaskStickySection>
              </StyledTaskWrapper>
            )}
          </Droppable>
        </StyledTaskContainer>
      </StyledTaskMain>
    </DragDropContext>
  );
}
