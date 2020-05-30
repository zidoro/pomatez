import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppStateTypes,
  TaskTypes,
  setTaskCardDone,
  skipTaskCard,
  removeTaskCard,
} from "store";

import {
  StyledTimerNoteContainer,
  StyledTimerNoteWrapper,
  StyledTimerNoteHeading,
  StyledTimerNoteDescription,
  StyledTimerNoteHeader,
  StyledTimerNoteOption,
  StyledPopperContent,
  StyledPopperHeader,
  StyledOptionList,
  StyledOptionPriority,
  StyledOptionDone,
  StyledOptionDelete,
} from "styles";
import { SVG } from "components";
import { useTargetOutside } from "hooks";
import { isObjectEmpty } from "utils";

const TimerNote: React.FC = () => {
  const tasks: TaskTypes[] = useSelector((state: AppStateTypes) => state.tasks);

  const dispatch = useDispatch();

  const priorityList = tasks.find((list) => list.priority);

  const notDoneCardList = priorityList?.cards.filter((card) => !card.done);

  const priorityCard = notDoneCardList && notDoneCardList[0];

  const optionRef = useRef<HTMLDivElement>(null);

  const [showOptions, setShowOptions] = useTargetOutside({ ref: optionRef });

  const setTaskCardDoneCallback = () => {
    if (isObjectEmpty(priorityCard)) return;
    dispatch(setTaskCardDone(priorityList?._id, priorityCard?._id));
    setShowOptions(false);
  };

  const skipTaskCardCallback = () => {
    if (isObjectEmpty(priorityCard)) return;
    dispatch(skipTaskCard(priorityList?._id));
    setShowOptions(false);
  };

  const deleteTaskCardCallback = () => {
    if (isObjectEmpty(priorityCard)) return;
    dispatch(removeTaskCard(priorityList?._id, priorityCard?._id));
    setShowOptions(false);
  };

  return (
    <StyledTimerNoteContainer>
      <StyledTimerNoteWrapper>
        <StyledTimerNoteOption onClick={() => setShowOptions(true)}>
          <SVG name="option-y" />
        </StyledTimerNoteOption>

        {showOptions && (
          <StyledPopperContent
            style={{
              top: "0",
              right: "0",
              margin: "2px",
            }}
            ref={optionRef}
          >
            <StyledPopperHeader>
              <h4>Actions</h4>
              <button onClick={() => setShowOptions(false)}>
                <SVG name="close" />
              </button>
            </StyledPopperHeader>

            <StyledOptionList>
              <StyledOptionDone onClick={setTaskCardDoneCallback}>
                Done Task
              </StyledOptionDone>
              <StyledOptionPriority onClick={skipTaskCardCallback}>
                Skip Task
              </StyledOptionPriority>
              <StyledOptionDelete onClick={deleteTaskCardCallback}>
                Delete
              </StyledOptionDelete>
            </StyledOptionList>
          </StyledPopperContent>
        )}

        <StyledTimerNoteHeader>
          <StyledTimerNoteHeading>
            {priorityCard?.text
              ? priorityCard?.text.truncate(36)
              : "No card inside of your priority list"}
          </StyledTimerNoteHeading>
          <StyledTimerNoteDescription>
            {priorityCard?.description
              ? priorityCard?.description.truncate(43)
              : "No description yet. Add by clicking the card"}
          </StyledTimerNoteDescription>
        </StyledTimerNoteHeader>
      </StyledTimerNoteWrapper>
    </StyledTimerNoteContainer>
  );
};

export default React.memo(TimerNote);
