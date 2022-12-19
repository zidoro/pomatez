import React from "react";
import { StyledDescriptionPreviewer } from "styles";
import ReactMarkdown from "react-markdown";

type Props = {
	description?: string;
	onClick?:
		| ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
		| undefined;
};

const MDPreviewer: React.FC<Props> = ({ description, onClick }) => {
	return (
		<StyledDescriptionPreviewer
			className="md-previewer"
			hasValue={description != null}
			onClick={(event) => {
				// Because it doesn't seem to let you reffer to target as HTMLDivElement, only currentElement which is wrong
				let target: any = event?.target;
				if (onClick && target?.tagName !== "A") {
					onClick(event);
				}
			}}
		>
			<ReactMarkdown
				escapeHtml={false}
				linkTarget={"_blank"}
				source={
					description ? description : "Add a more detailed description..."
				}
			/>
		</StyledDescriptionPreviewer>
	);
};

export default React.memo(MDPreviewer);
