import { createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./themes";
import media from "./media";

type GlobalProps = {
	isDarkMode?: boolean;
};

export const GlobalStyle = createGlobalStyle<GlobalProps>`

  :root {
    ${(p) => {
			if (p.isDarkMode) {
				return darkTheme;
			}
			return lightTheme;
		}}
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
    font-family: inherit;
    font-size: inherit;

    color: currentColor;
  }

  html {
    font-size: 62.5%;
    font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;

    ${media.laptopSm}{
      font-size: 56.25%;
    }
  }

  body {
    font-size: 1.6rem;
    font-weight: normal;
    color: var(--cl-body-text);
    background: var(--bg-primary);
    
    counter-reset: header;          
  }

  a {
    text-decoration: none;
  }

  p {
    line-height: 1.6;
  }

`;
