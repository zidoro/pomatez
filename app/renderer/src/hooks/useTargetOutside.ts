import { useState, useLayoutEffect } from "react";

interface TargetOutside {
	ref: React.RefObject<HTMLElement>;
	eventType?: string;
}

/**
 * If you want to listen to clicks outside the element set eventType to 'click'
 * @param ref
 * @param eventType
 */
export const useTargetOutside = ({ ref, eventType }: TargetOutside) => {
	const [state, setState] = useState<any>();

	useLayoutEffect(() => {
		function outsideTarget(e: Event) {
			const { current } = ref;
			const target = e.target as HTMLElement;

			if (current) {
				if (current.contains(target)) {
					return;
				}
				setState(false);
			}
		}

		function closeOnEscape(e: KeyboardEvent) {
			if (e.keyCode === 27) {
				setState(false);
			}
		}

		if (state) {
			if (eventType) document.addEventListener(eventType, outsideTarget);
			document.addEventListener("keydown", closeOnEscape);
		}
		return () => {
			if (eventType) document.removeEventListener(eventType, outsideTarget);
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [state, ref, eventType]);

	return [state, setState];
};
