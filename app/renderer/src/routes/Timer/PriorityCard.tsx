import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppStateTypes,
  setTaskCardDone,
  skipTaskCard,
  removeTaskCard,
} from "store";

import {
  StyledPriorityCardContainer,
  StyledPriorityCardWrapper,
  StyledPriorityCardHeading,
  StyledPriorityCardDescription,
  StyledPriorityCardHeader,
  StyledPriorityCardOption,
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

const PriorityCard: React.FC = () => {
  const tasks = useSelector(
    (state: AppStateTypes) => state.tasks.present
  );

  const dispatch = useDispatch();

  const priorityList = tasks.find((list) => list.priority);

  const notDoneCardList = priorityList?.cards.filter(
    (card) => !card.done
  );

  const priorityCard = notDoneCardList && notDoneCardList[0];

  const optionRef = useRef<HTMLDivElement>(null);

  const [showOptions, setShowOptions] = useTargetOutside({
    ref: optionRef,
  });

  const setTaskCardDoneCallback = () => {
    if (!isObjectEmpty(priorityCard)) {
      dispatch(setTaskCardDone(priorityList?._id, priorityCard?._id));
    }
    setShowOptions(false);
  };

  const skipTaskCardCallback = () => {
    if (!isObjectEmpty(priorityCard)) {
      dispatch(skipTaskCard(priorityList?._id));
    }
    setShowOptions(false);
  };

  const deleteTaskCardCallback = () => {
    if (!isObjectEmpty(priorityCard)) {
      dispatch(removeTaskCard(priorityList?._id, priorityCard?._id));
    }
    setShowOptions(false);
  };

  const getTaskNoteHeading = () => {
    if (isObjectEmpty(priorityList)) {
      return "No priority list has been created yet.";
    } else {
      if (priorityCard?.text) {
        return priorityCard?.text;
      }
      return "No task item on your priority list.";
    }
  };

  const getTaskNoteDescription = () => {
    if (isObjectEmpty(priorityList)) {
      return "Create a priority list and add task items on it.";
    } else {
      if (isObjectEmpty(priorityCard)) {
        return "Add at least one item on your priority list.";
      } else {
        if (priorityCard?.description) {
          return priorityCard?.description;
        }
        return "";
      }
    }
  };

  return (
    <StyledPriorityCardContainer>
      <StyledPriorityCardWrapper>
        <StyledPriorityCardOption
          onClick={() => {
            setShowOptions(true);
          }}
        >
          <SVG name="option-y" />
        </StyledPriorityCardOption>

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

        <StyledPriorityCardHeader>
          <StyledPriorityCardHeading>
            {getTaskNoteHeading()}
          </StyledPriorityCardHeading>
          <StyledPriorityCardDescription>
            {getTaskNoteDescription()}
          </StyledPriorityCardDescription>
        </StyledPriorityCardHeader>
      </StyledPriorityCardWrapper>
    </StyledPriorityCardContainer>
  );
};

export default React.memo(PriorityCard);
