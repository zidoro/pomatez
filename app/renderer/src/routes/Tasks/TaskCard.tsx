import React, { useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import autoSize from "autosize";
import {
	StyledCard,
	StyledCardText,
	StyledCardEditButton,
	StyledCardSaveButton,
	StyledCardTextArea,
	StyledCardActionWrapper,
	StyledCardDeleteButton,
} from "styles";
import { SVG } from "components";
import { useTargetOutside } from "hooks";

type Props = {
	id: string;
	text: string;
	index: number;
	done: boolean;
	onClick?:
		| ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
		| undefined;
	onSaveCardText?: (text: string) => void;
	onDeleteCard?: () => void;
};

const TaskCard: React.FC<Props> = ({
	id,
	text,
	index,
	done,
	onClick,
	onDeleteCard,
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

				areaRef.current.onkeypress = (e: KeyboardEvent) => {
					if (e.keyCode !== 10 || !areaRef.current) return;
					e.preventDefault();
					if (onSaveCardText && areaRef.current.value) {
						onSaveCardText(areaRef.current.value);
					}
					setEditing(false);
				};
			}
		}
	}, [editing, text, onSaveCardText, setEditing]);

	const onEditCardAction = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
		setEditing(true);
	};

	const onDeleteCardAction = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation();
		if (onDeleteCard) {
			onDeleteCard();
		}
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
			<StyledCardText done={done}>{text}</StyledCardText>
		);

	const renderActionButton = () =>
		editing ? (
			<StyledCardSaveButton onClick={onSaveCardAction}>
				<SVG name="save" />
			</StyledCardSaveButton>
		) : (
			<StyledCardActionWrapper>
				<StyledCardEditButton onClick={onEditCardAction}>
					<SVG name="pencil" />
				</StyledCardEditButton>
				<StyledCardDeleteButton onClick={onDeleteCardAction}>
					<SVG name="trash" />
				</StyledCardDeleteButton>
			</StyledCardActionWrapper>
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
