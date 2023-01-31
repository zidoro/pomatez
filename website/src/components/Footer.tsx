import React from "react";
import {
  StyledCopyrightText,
  StyledFooter,
  StyledFooterContent,
  StyledFooterNote,
} from "../styles";
import {
  APP_NAME,
  AUTHOR_GITHUB_URL,
  PROJECT_GITHUB_URL,
} from "../config";
import { SVG } from "./svg";

export function Footer() {
  return (
    <StyledFooter>
      <StyledFooterContent>
        <a
          href={PROJECT_GITHUB_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          <SVG name="github" />
          <StyledCopyrightText>
            {APP_NAME} © {new Date().getFullYear()}
          </StyledCopyrightText>
        </a>

        <StyledFooterNote>
          Developed and Maintained by <br />
          <a
            href={AUTHOR_GITHUB_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Roldan Montilla Jr
          </a>
        </StyledFooterNote>
      </StyledFooterContent>
    </StyledFooter>
  );
}
