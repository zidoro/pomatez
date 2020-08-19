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
      onClick={onClick}
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
