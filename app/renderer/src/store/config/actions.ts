import {
	ConfigTypes,
	ConfigActionTypes,
	SET_STAY_FOCUS,
	SET_SHORT_BREAK,
	SET_LONG_BREAK,
	SET_SESSION_ROUNDS,
	RESTORE_DEFAULT_CONFIG,
	SpecialBreakTypes,
	SET_FIRST_SPECIAL_BREAK,
	SET_SECOND_SPECIAL_BREAK,
	SET_THIRD_SPECIAL_BREAK,
	SET_FOUTH_SPECIAL_BREAK,
} from "./types";

export const setStayFocus = (
	stayFocus: ConfigTypes["stayFocus"]
): ConfigActionTypes => {
	return {
		type: SET_STAY_FOCUS,
		payload: stayFocus,
	};
};

export const setShorBreak = (
	shortBreak: ConfigTypes["shortBreak"]
): ConfigActionTypes => {
	return {
		type: SET_SHORT_BREAK,
		payload: shortBreak,
	};
};

export const setLongBreak = (
	longBreak: ConfigTypes["longBreak"]
): ConfigActionTypes => {
	return {
		type: SET_LONG_BREAK,
		payload: longBreak,
	};
};

export const setSessionRounds = (
	sessionRounds: ConfigTypes["sessionRounds"]
): ConfigActionTypes => {
	return {
		type: SET_SESSION_ROUNDS,
		payload: sessionRounds,
	};
};

export const restoreDefaultConfig = () => ({
	type: RESTORE_DEFAULT_CONFIG,
});

export const setFirstSpecialBreak = (
	specialBreak: SpecialBreakTypes
): ConfigActionTypes => {
	return {
		type: SET_FIRST_SPECIAL_BREAK,
		payload: specialBreak,
	};
};

export const setSecondSpecialBreak = (
	specialBreak: SpecialBreakTypes
): ConfigActionTypes => {
	return {
		type: SET_SECOND_SPECIAL_BREAK,
		payload: specialBreak,
	};
};

export const setThirdSpecialBreak = (
	specialBreak: SpecialBreakTypes
): ConfigActionTypes => {
	return {
		type: SET_THIRD_SPECIAL_BREAK,
		payload: specialBreak,
	};
};

export const setFourthSpecialBreak = (
	specialBreak: SpecialBreakTypes
): ConfigActionTypes => {
	return {
		type: SET_FOUTH_SPECIAL_BREAK,
		payload: specialBreak,
	};
};
