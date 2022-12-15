export const useRippleEffect =
	() =>
	(
		e: React.MouseEvent<HTMLElement>,
		ref: React.RefObject<HTMLButtonElement>,
		fnCallback: () => void,
	) => {
		e.preventDefault();

		const { current } = ref;

		const buttonStyles: React.CSSProperties = {
			position: "relative",
			overflow: "hidden",
		};

		if (current) Object.assign(current.style, buttonStyles);

		if (current) {
			let x = e.pageX - current.offsetLeft;
			let y = e.pageY - current.offsetTop;

			const rippleEl = document.createElement("span");

			rippleEl.classList.add("ripple-hook");

			const rippleStyles: React.CSSProperties = {
				top: `${y}px`,
				left: `${x}px`,
			};

			Object.assign(rippleEl.style, rippleStyles);

			const customColor = current.getAttribute("color");
			if (customColor) {
				rippleEl.style.backgroundColor = customColor;
			}

			current.appendChild(rippleEl);

			setTimeout(() => {
				const parentEl = rippleEl.parentElement;
				if (parentEl) {
					parentEl.removeChild(rippleEl);
				}
			}, 1000);
		}

		if (fnCallback) {
			fnCallback();
		}
	};
