export const easing = [0.8, -0.05, 0.01, 0.99];

export const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

export const fadeIn = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: easing,
		},
	},
};

export const fadeFromTop = {
	initial: {
		y: -60,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: easing,
		},
	},
};

export const fadeFromBottom = {
	initial: {
		y: 60,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: easing,
		},
	},
};

export const fadeFromLeft = {
	initial: {
		x: -60,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: easing,
		},
	},
};

export const fadeFromRight = {
	initial: {
		x: 60,
		opacity: 0,
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: easing,
		},
	},
};
