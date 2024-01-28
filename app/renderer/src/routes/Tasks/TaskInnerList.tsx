import React from "react";
import type { TaskList as TaskListType } from "store";
import TaskList from "./TaskList";
import { StyledTaskSection } from "styles";

type Props = {
  tasks: TaskListType[];
};

const TaskInnerList: React.FC<Props> = ({ tasks }) => {
  return (
    <StyledTaskSection>
      {tasks.map(({ _id, title, cards, priority }, index) => (
        <TaskList
          listId={_id}
          title={title}
          cards={cards}
          priority={priority}
          key={_id}
          index={index}
        />
      ))}
    </StyledTaskSection>
  );
};

export default React.memo(TaskInnerList);
