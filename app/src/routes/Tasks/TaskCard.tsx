import React, { useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import autoSize from "autosize";
import {
  StyledCard,
  StyledCardText,
  StyledCardEditButton,
  StyledCardSaveButton,
  StyledCardTextArea,
} from "styles";
import { SVG } from "components";
import { useTargetOutside } from "hooks";

type Props = {
  id: string;
  text: string;
  index: number;
  onClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
  onSaveCardText?: (text: string) => void;
};

const TaskCard: React.FC<Props> = ({
  id,
  text,
  index,
  onClick,
  onSaveCardText,
}) => {
  const areaRef = useRef<HTMLTextAreaElement>(null);

  const [editing, setEditing] = useTargetOutside({ ref: areaRef });

  useEffect(() => {
    if (editing) {
      if (areaRef.current) {
        areaRef.current.focus();
        areaRef.current.value = text;

        autoSize(areaRef.current);
      }
    }
  }, [editing, text]);

  const onEditCardAction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setEditing(true);
  };

  const onSaveCardAction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (areaRef.current) {
      if (onSaveCardText && areaRef.current.value) {
        onSaveCardText(areaRef.current.value);
      }
      setEditing(false);
    }
  };

  const renderCardText = () =>
    editing ? (
      <StyledCardTextArea
        ref={areaRef}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    ) : (
      <StyledCardText>{text}</StyledCardText>
    );

  const renderActionButton = () =>
    editing ? (
      <StyledCardSaveButton onClick={onSaveCardAction}>
        <SVG name="save" />
      </StyledCardSaveButton>
    ) : (
      <StyledCardEditButton onClick={onEditCardAction}>
        <SVG name="pencil" />
      </StyledCardEditButton>
    );

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <StyledCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          focused={editing}
          onClick={onClick}
        >
          {renderCardText()}
          {renderActionButton()}
        </StyledCard>
      )}
    </Draggable>
  );
};

export default React.memo(TaskCard);
