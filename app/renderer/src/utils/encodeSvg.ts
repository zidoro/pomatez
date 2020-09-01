import ReactDOMServer from "react-dom/server";

export function encodeSvg(reactElement: any) {
	return (
		"data:image/svg+xml," +
		escape(ReactDOMServer.renderToStaticMarkup(reactElement))
	);
}
