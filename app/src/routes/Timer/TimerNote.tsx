import React from "react";
import { useSelector } from "react-redux";
import { AppStateTypes, TaskTypes } from "store";

import {
  StyledTimerNoteContainer,
  StyledTimerNoteWrapper,
  StyledTimerNoteHeading,
  StyledTimerNoteDescription,
  StyledTimerNoteHeader,
} from "styles";

const TimerNote: React.FC = () => {
  const tasks: TaskTypes[] = useSelector((state: AppStateTypes) => state.tasks);

  const priorityCard = tasks.find((list) => list.priority)?.cards[0];

  return (
    <StyledTimerNoteContainer>
      <StyledTimerNoteWrapper to="tasklist">
        <StyledTimerNoteHeader>
          <StyledTimerNoteHeading>
            {priorityCard?.text
              ? priorityCard?.text.truncate(37)
              : "No card inside of your priority list"}
          </StyledTimerNoteHeading>
          <StyledTimerNoteDescription>
            {priorityCard?.description
              ? priorityCard?.description.truncate(44)
              : "No description yet. Add by clicking the card"}
          </StyledTimerNoteDescription>
        </StyledTimerNoteHeader>
      </StyledTimerNoteWrapper>
    </StyledTimerNoteContainer>
  );
};

export default React.memo(TimerNote);
