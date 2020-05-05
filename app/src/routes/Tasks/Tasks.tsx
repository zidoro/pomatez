import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import {
  StyledTaskContainer,
  StyledTaskStickySection,
  StyledTaskWrapper,
  StyledTaskMain,
} from "styles";
import { AppStateTypes, addTaskList, TaskTypes, dragList } from "store";

import TaskFormButton from "./TaskFormButton";
import TaskInnerList from "./TaskInnerList";

export const Tasks: React.FC = () => {
  const tasks: TaskTypes[] = useSelector((state: AppStateTypes) => state.tasks);

  const dispatch = useDispatch();

  const onListAdd = (value: string) => dispatch(addTaskList(value));

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    dispatch(
      dragList(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledTaskMain>
        <StyledTaskContainer>
          <Droppable droppableId="task-list" direction="vertical" type="list">
            {(provided) => (
              <StyledTaskWrapper
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <TaskInnerList tasks={tasks} />

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
};

export default Tasks;
