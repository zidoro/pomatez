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

	const doSubmit = useCallback((ref: HTMLInputElement | HTMLTextAreaElement) => {
		const { value } = ref;
		if (!value) return false;

		if (onSubmit) {
			onSubmit(value);
			ref.focus();

			if (formRef.current) {
				formRef.current.reset();
			}
		}

		return true;
	}, [onSubmit]);

	useEffect(() => {
		if (isOpen) {
			if (forList) {
				if (inputRef.current) {
					inputRef.current.focus();

					inputRef.current.onkeypress = (e: KeyboardEvent) => {
						if (e.keyCode === 10 && inputRef.current) {
							e.preventDefault();
							doSubmit(inputRef.current);
						}
					};
				}
			} else {
				if (areaRef.current) {
					areaRef.current.focus();
					autoSize(areaRef.current);

					areaRef.current.onkeypress = (e: KeyboardEvent) => {
						if (e.keyCode === 10 && areaRef.current) {
							e.preventDefault();
							if (doSubmit(areaRef.current))
								areaRef.current.style.height = "inherit";
						}
					};
				}
			}
		}
	}, [isOpen, forList, doSubmit]);

	const onSubmitAction = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (forList) {
				inputRef.current && doSubmit(inputRef.current);
			} else {
				if (areaRef.current && doSubmit(areaRef.current)) {
					areaRef.current.style.height = "inherit";
				}
			}
		},
		[forList, doSubmit]
	);

	const showFormAction = () => setOpen && setOpen(true);

	const hideFormAction = () => setOpen && setOpen(false);

	const renderButton = () =>
		forList ? (
			<StyledButtonNormal
				style={{ justifyContent: "flex-start" }}
				onClick={showFormAction}
			>
				<SVG name="add" />
				Add another list
			</StyledButtonNormal>
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
