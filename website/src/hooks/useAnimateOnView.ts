import { useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";

export const useAnimateOnView = () => {
	let ref = useRef();

	let [inViewRef, inView] = useInView();

	const setRefs = useCallback(
		(node) => {
			ref.current = node;
			inViewRef(node);
		},
		[inViewRef]
	);

	return [setRefs, inView];
};
