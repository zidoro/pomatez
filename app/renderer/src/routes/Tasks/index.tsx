import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators as UndoActionCreator } from "redux-undo";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import {
	StyledTaskContainer,
	StyledTaskStickySection,
	StyledTaskWrapper,
	StyledTaskMain,
} from "styles";
import { AppStateTypes, addTaskList, dragList } from "store";

import TaskFormButton from "./TaskFormButton";
import TaskInnerList from "./TaskInnerList";

export default () => {
	const tasks = useSelector((state: AppStateTypes) => state.tasks);

	const dispatch = useDispatch();

	const onListAdd = (value: string) => dispatch(addTaskList(value));

	const onDragEnd = (result: DropResult) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		dispatch(
			dragList(
				source.droppableId,
				destination.droppableId,
				source.index,
				destination.index,
				draggableId,
				type,
			),
		);
	};

	useEffect(() => {
		function registerUndoRedoKeys(e: KeyboardEvent) {
			const activeElement = document.activeElement?.tagName;

			if (activeElement !== "INPUT" && activeElement !== "TEXTAREA") {
				if (e.ctrlKey && e.key === "z") {
					if (tasks.past.length > 0) {
						dispatch(UndoActionCreator.undo());
					}
				}

				if (e.ctrlKey && e.key === "Z") {
					if (tasks.future.length > 0) {
						dispatch(UndoActionCreator.redo());
					}
				}
			}
		}

		document.addEventListener("keydown", registerUndoRedoKeys);
		return () => document.removeEventListener("keydown", registerUndoRedoKeys);
	}, [dispatch, tasks.past.length, tasks.future.length]);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<StyledTaskMain>
				<StyledTaskContainer>
					<Droppable droppableId="task-list" direction="vertical" type="list">
						{(provided) => (
							<StyledTaskWrapper
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								<TaskInnerList tasks={tasks.present} />

								{provided.placeholder}

								<StyledTaskStickySection>
									<TaskFormButton forList onSubmit={onListAdd} />
								</StyledTaskStickySection>
							</StyledTaskWrapper>
						)}
					</Droppable>
				</StyledTaskContainer>
			</StyledTaskMain>
		</DragDropContext>
	);
};
