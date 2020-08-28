import React, { useRef, useEffect } from "react";
import {
	StyledTaskHeader,
	StyledTaskHeaderOption,
	StyledTaskHeading,
	StyledTaskHeadeInput,
	StyledOptionList,
	StyledPopperContent,
	StyledPopperHeader,
	StyledOptionDelete,
	StyledOptionPriority,
} from "styles";
import { SVG } from "components";
import { useTargetOutside } from "hooks";

type Props = {
	title: string;

	onEditTitle?: (title: string) => void;
	onRemoveList?: () => void;
	onMakeListPriority?: () => void;
};

const TaskHeader: React.FC<Props> = ({
	title,
	onEditTitle,
	onRemoveList,
	onMakeListPriority,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const optionRef = useRef<HTMLDivElement>(null);

	const [editing, setEditing] = useTargetOutside({ ref: inputRef });

	const [showOptions, setShowOptions] = useTargetOutside({ ref: optionRef });

	useEffect(() => {
		if (editing) {
			if (inputRef.current) {
				inputRef.current.focus();
				inputRef.current.value = title;

				inputRef.current.onblur = () => {
					if (inputRef.current) {
						if (onEditTitle && inputRef.current.value) {
							onEditTitle(inputRef.current.value);
						}
						setEditing(false);
					}
				};

				inputRef.current.onkeyup = (e: KeyboardEvent) => {
					if (e.keyCode === 13) {
						if (inputRef.current) {
							if (onEditTitle && inputRef.current.value) {
								onEditTitle(inputRef.current.value);
							}
							setEditing(false);
						}
					}
				};
			}
		}
	}, [editing, title, setEditing, onEditTitle]);

	const onEditTitleAction = () => setEditing(true);

	const renderListTitle = () =>
		editing ? (
			<StyledTaskHeadeInput ref={inputRef} />
		) : (
			<StyledTaskHeading onClick={onEditTitleAction}>{title}</StyledTaskHeading>
		);

	return (
		<StyledTaskHeader>
			{renderListTitle()}
			<StyledTaskHeaderOption onClick={() => setShowOptions(true)}>
				<SVG name="option-x" />
			</StyledTaskHeaderOption>

			{showOptions && (
				<StyledPopperContent
					style={{
						top: "0",
						right: "0",
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
						<StyledOptionPriority
							onClick={() => {
								if (onMakeListPriority) onMakeListPriority();
								setShowOptions(false);
							}}
						>
							Priority List
						</StyledOptionPriority>

						<StyledOptionDelete
							onClick={() => {
								if (onRemoveList) onRemoveList();
								setShowOptions(false);
							}}
						>
							Delete
						</StyledOptionDelete>
					</StyledOptionList>
				</StyledPopperContent>
			)}
		</StyledTaskHeader>
	);
};

export default React.memo(TaskHeader);
