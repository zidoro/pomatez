import {
	TimerActionTypes,
	SET_PLAY,
	TimerTypes,
	SET_TIMER_TYPE,
	SET_ROUND,
	SKIP_TIMER,
} from "./types";

export const setPlay = (playing: TimerTypes["playing"]): TimerActionTypes => {
	return {
		type: SET_PLAY,
		payload: playing,
	};
};

export const setTimerType = (
	timerType: TimerTypes["timerType"]
): TimerActionTypes => {
	return {
		type: SET_TIMER_TYPE,
		payload: timerType,
	};
};

export const setRound = (round: TimerTypes["round"]): TimerActionTypes => {
	return {
		type: SET_ROUND,
		payload: round,
	};
};

export const skipTimer = (
	timerType: TimerTypes["timerType"]
): TimerActionTypes => {
	return {
		type: SKIP_TIMER,
		payload: timerType,
	};
};
