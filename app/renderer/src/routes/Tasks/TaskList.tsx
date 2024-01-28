import React, { useRef, useState } from "react";
import { useAppDispatch } from "hooks";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  addTaskCard,
  editTaskTitle,
  editTaskCardText,
  removeTaskList,
  setTaskListPriority,
  removeTaskCard,
} from "store";
import { StyledTaskSectionItem, StyledCardWrapper } from "styles";
import type { TaskList as TaskListType } from "store";
import TaskHeader from "./TaskHeader";
import TaskFormButton from "./TaskFormButton";
import TaskDetails from "./TaskDetails";
import TaskCard from "./TaskCard";

type Props = {
  priority: boolean;
  listId: string;
  title: string;
  cards: TaskListType["cards"];
  index: number;
};

const TaskList: React.FC<Props> = ({
  priority,
  title,
  cards,
  listId,
  index,
}) => {
  const detailRef = useRef<HTMLDivElement>(null);

  const [showDetails, setShowDetails] = useState(false);

  const [cardId, setCardId] = useState("");

  const dispatch = useAppDispatch();

  const onCardAdd = (cardText: string) => {
    dispatch(addTaskCard({ listId, cardText }));
  };

  const onEditListTitle = (listTitle: string) => {
    dispatch(editTaskTitle({ listId, listTitle }));
  };

  const onRemoveListAction = () => {
    dispatch(removeTaskList(listId));
  };

  const onSetListPriorityAction = () => {
    dispatch(setTaskListPriority(listId));
  };

  return (
    <>
      <Draggable draggableId={listId} index={index}>
        {(dragProvided, snapshot) => (
          <div
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
            ref={dragProvided.innerRef}
          >
            <Droppable droppableId={listId}>
              {(dropProvided) => (
                <StyledTaskSectionItem
                  {...dropProvided.droppableProps}
                  isDragging={snapshot.isDragging}
                  ref={dropProvided.innerRef}
                  priority={priority}
                >
                  <TaskHeader
                    title={title}
                    onEditTitle={onEditListTitle}
                    onRemoveList={onRemoveListAction}
                    onMakeListPriority={onSetListPriorityAction}
                  />

                  <StyledCardWrapper>
                    {cards.map(({ _id, text, done }, index) => (
                      <TaskCard
                        key={_id}
                        text={text}
                        id={_id}
                        index={index}
                        done={done}
                        onClick={(e) => {
                          setCardId(_id);
                          setShowDetails(true);
                        }}
                        onSaveCardText={(text) =>
                          dispatch(
                            editTaskCardText({
                              listId,
                              cardId: _id,
                              cardText: text,
                            })
                          )
                        }
                        onDeleteCard={() =>
                          dispatch(
                            removeTaskCard({ listId, cardId: _id })
                          )
                        }
                      />
                    ))}
                  </StyledCardWrapper>

                  {dropProvided.placeholder}

                  <TaskFormButton onSubmit={onCardAdd} />
                </StyledTaskSectionItem>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>

      {showDetails && (
        <TaskDetails
          ref={detailRef}
          listId={listId}
          cardId={cardId}
          onExit={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default React.memo(TaskList);
