import React, { useRef, useEffect, useCallback } from "react";
import {
	StyledTaskForm,
	StyledButtonPrimary,
	StyledButtonNormal,
	StyledTaskInput,
	StyledTaskTextArea,
	StyledTaskCardCancel,
	StyledButton,
} from "styles";
import { SVG } from "components";
import autoSize from "autosize";
import { useTargetOutside } from "hooks";

type Props = {
	forList?: boolean;
	onSubmit?: (value: string) => void;
};

const TaskFormButton: React.FC<Props> = ({ forList, onSubmit }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const areaRef = useRef<HTMLTextAreaElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const [isOpen, setOpen] = useTargetOutside({ ref: formRef });

	useEffect(() => {
		if (isOpen) {
			if (forList) {
				if (inputRef.current) {
					inputRef.current.focus();
				}
			} else {
				if (areaRef.current) {
					areaRef.current.focus();
					autoSize(areaRef.current);
				}
			}
		}
	}, [isOpen, forList]);

	const onSubmitAction = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (forList) {
				if (inputRef.current) {
					const { value } = inputRef.current;

					if (value) {
						if (onSubmit) {
							onSubmit(value);
							inputRef.current.focus();

							if (formRef.current) {
								formRef.current.reset();
							}
						}
					}
				}
			} else {
				if (areaRef.current) {
					const { value } = areaRef.current;

					if (value) {
						if (onSubmit) {
							onSubmit(value);
							areaRef.current.focus();
							areaRef.current.style.height = "inherit";

							if (formRef.current) {
								formRef.current.reset();
							}
						}
					}
				}
			}
		},
		[forList, onSubmit]
	);

	const showFormAction = () => setOpen && setOpen(true);

	const hideFormAction = () => setOpen && setOpen(false);

	const renderButton = () =>
		forList ? (
			<StyledButtonPrimary
				style={{ justifyContent: "flex-start" }}
				onClick={showFormAction}
			>
				<SVG name="add" />
				Add another list
			</StyledButtonPrimary>
		) : (
			<StyledButton
				style={{ justifyContent: "flex-start" }}
				onClick={showFormAction}
			>
				<SVG name="add" />
				Add another card
			</StyledButton>
		);

	const renderFormInput = () =>
		forList ? (
			<StyledTaskInput placeholder="Enter list title" ref={inputRef} />
		) : (
			<StyledTaskTextArea
				placeholder="Enter a title for this card..."
				ref={areaRef}
			/>
		);

	const renderCancelButton = () =>
		forList ? (
			<StyledButtonNormal onClick={hideFormAction}>Cancel</StyledButtonNormal>
		) : (
			<StyledTaskCardCancel onClick={hideFormAction}>
				Cancel
			</StyledTaskCardCancel>
		);

	const renderForm = () => (
		<StyledTaskForm onSubmit={onSubmitAction} ref={formRef}>
			{renderFormInput()}
			<StyledButtonPrimary type="submit">
				{forList ? "Add List" : "Add Card"}
			</StyledButtonPrimary>
			{renderCancelButton()}
		</StyledTaskForm>
	);

	return isOpen ? renderForm() : renderButton();
};

export default React.memo(TaskFormButton);
