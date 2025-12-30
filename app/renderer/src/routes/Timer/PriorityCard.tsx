import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "hooks";
import { setTaskCardDone, skipTaskCard, removeTaskCard } from "store";

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
  StyledSectionSeparator,
} from "styles";
import { SVG } from "components";
import { useTargetOutside } from "hooks";

const PriorityCard: React.FC = () => {
  const { t } = useTranslation();
  const tasks = useAppSelector((state) => state.tasks.present);

  const dispatch = useAppDispatch();

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
    if (priorityCard && priorityList) {
      dispatch(
        setTaskCardDone({
          listId: priorityList?._id,
          cardId: priorityCard?._id,
        })
      );
    }
    setShowOptions(false);
  };

  const skipTaskCardCallback = () => {
    if (priorityList) {
      dispatch(skipTaskCard(priorityList?._id));
    }
    setShowOptions(false);
  };

  const deleteTaskCardCallback = () => {
    if (priorityList && priorityCard) {
      dispatch(
        removeTaskCard({
          listId: priorityList?._id,
          cardId: priorityCard?._id,
        })
      );
    }
    setShowOptions(false);
  };

  const getTaskNoteHeading = () => {
    if (priorityCard?.text) {
      return priorityCard?.text;
    }
    return "";
  };

  const getTaskNoteDescription = () => {
    if (priorityCard?.description) {
      return priorityCard?.description;
    }
    return "";
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
              <h4>{t("tasks.actions")}</h4>
              <button onClick={() => setShowOptions(false)}>
                <SVG name="close" />
              </button>
            </StyledPopperHeader>

            <StyledOptionList>
              <StyledOptionDone onClick={setTaskCardDoneCallback}>
                {t("tasks.done")}
              </StyledOptionDone>
              <StyledOptionPriority onClick={skipTaskCardCallback}>
                {t("tasks.skip")}
              </StyledOptionPriority>
              <StyledOptionDelete onClick={deleteTaskCardCallback}>
                {t("tasks.delete")}
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
