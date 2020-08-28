import { createGlobalStyle } from "styled-components/macro";
import { darkTheme, lightTheme } from "./themes";

type GlobalTypes = {
	isDarkMode?: boolean;
	useNativeTitlebar?: boolean;
};

export const GlobalStyles = createGlobalStyle<GlobalTypes>`

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
    padding:0;
    box-sizing: border-box;
    outline: none;
    user-select: none;
    font-family: inherit;
    font-size: inherit;
    color: currentColor;
  }

  html {
    width: 100%;
    height: 100%;

    font-size: 62.5%;
    font-family: Noto-Sans, san-serif;
    font-weight: normal;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  html,
  body {
    overflow: hidden;
    box-sizing: inherit;

    background-color: var(--color-bg-primary);
  }

  body {
    font-size: 1.3rem;
    font-weight: 400;
    color: var(--color-body-text);
    
    width: 340px;
    height: max-content;
    border: ${(p) =>
			!p.useNativeTitlebar ? "1px solid var(--color-border-window)" : "none"} ;
    box-shadow: ${(p) =>
			!p.useNativeTitlebar && "0 1px 16px -4px rgba(0, 0, 0, 0.5)"};
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: currentColor;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    color: var(--color-heading-text);
  }

  .ripple-hook {
    position: absolute;

    width: .5rem;
    height: .5rem;

    opacity: 0;

    border-radius: 50%;
    background-color: var(--color-bg-ripple-primary);

    animation: rippleEffect 1s;

    @keyframes rippleEffect {
      0% {
        transform: scale(1);
        opacity: 0.4;
      }
      100% {
        transform: scale(100);
        opacity: 0;
      }
    }
  }
`;
