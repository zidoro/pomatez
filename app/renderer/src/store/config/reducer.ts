import { getFromStorage } from "utils";
import {
	ConfigTypes,
	ConfigActionTypes,
	SET_STAY_FOCUS,
	SET_SHORT_BREAK,
	SET_LONG_BREAK,
	SET_SESSION_ROUNDS,
	RESTORE_DEFAULT_CONFIG,
	SET_FIRST_SPECIAL_BREAK,
	SET_SECOND_SPECIAL_BREAK,
	SET_THIRD_SPECIAL_BREAK,
	SET_FOUTH_SPECIAL_BREAK,
} from "./types";

const defaultConfig: ConfigTypes = {
	stayFocus: 25,
	shortBreak: 5,
	longBreak: 15,
	sessionRounds: 4,
	specialBreaks: {
		firstBreak: {
			fromTime: "",
			toTime: "",
			duration: 0,
		},
		secondBreak: {
			fromTime: "",
			toTime: "",
			duration: 0,
		},
		thirdBreak: {
			fromTime: "",
			toTime: "",
			duration: 0,
		},
		fourthBreak: {
			fromTime: "",
			toTime: "",
			duration: 0,
		},
	},
};

const config =
	(getFromStorage("state") && getFromStorage("state").config) || defaultConfig;

const initialState: ConfigTypes = config;

export const configReducer = (
	state = initialState,
	action: ConfigActionTypes,
) => {
	switch (action.type) {
		case SET_STAY_FOCUS:
			return {
				...state,
				stayFocus: action.payload,
			};
		case SET_SHORT_BREAK:
			return {
				...state,
				shortBreak: action.payload,
			};
		case SET_LONG_BREAK:
			return {
				...state,
				longBreak: action.payload,
			};
		case SET_SESSION_ROUNDS:
			return {
				...state,
				sessionRounds: action.payload,
			};
		case SET_FIRST_SPECIAL_BREAK:
			return {
				...state,
				specialBreaks: {
					...state.specialBreaks,
					firstBreak: action.payload,
				},
			};
		case SET_SECOND_SPECIAL_BREAK:
			return {
				...state,
				specialBreaks: {
					...state.specialBreaks,
					secondBreak: action.payload,
				},
			};
		case SET_THIRD_SPECIAL_BREAK:
			return {
				...state,
				specialBreaks: {
					...state.specialBreaks,
					thirdBreak: action.payload,
				},
			};
		case SET_FOUTH_SPECIAL_BREAK:
			return {
				...state,
				specialBreaks: {
					...state.specialBreaks,
					fourthBreak: action.payload,
				},
			};
		case RESTORE_DEFAULT_CONFIG:
			return defaultConfig;
		default:
			return state;
	}
};
