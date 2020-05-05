import React from "react";
import { StyledDescriptionPreviewer } from "styles";
import ReactMarkdown from "react-markdown";

type Props = {
  description?: string;
  onDoubleClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
};

const MDPreviewer: React.FC<Props> = ({ description, onDoubleClick }) => {
  return (
    <StyledDescriptionPreviewer
      className="md-previewer"
      hasValue={description != null}
      onDoubleClick={onDoubleClick}
    >
      <ReactMarkdown
        escapeHtml={false}
        source={
          description ? description : "Add a more detailed description..."
        }
      />
    </StyledDescriptionPreviewer>
  );
};

export default React.memo(MDPreviewer);
