import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStayAwake from "use-stay-awake";
import {
	AppStateTypes,
	STAY_FOCUS,
	SHORT_BREAK,
	setRound,
	setTimerType,
	LONG_BREAK,
	TimerTypes,
	SPECIAL_BREAK,
	SettingTypes,
	setPlay,
} from "store";
import { useNotification } from "hooks";
import { padNum, isEqualToOne } from "utils";

import notificationIcon from "assets/logos/notification-dark.png";

import breakFinishedWav from "assets/audios/break-finished.wav";
import focusFinishedWav from "assets/audios/focus-finished.wav";
import sessionCompletedWav from "assets/audios/session-completed.wav";
import sixtySecondsLeftWav from "assets/audios/sixty-seconds-left.wav";
import specialBreakStartedWav from "assets/audios/special-break-started.wav";
import thirtySecondsLeftWav from "assets/audios/thirty-seconds-left.wav";

type CounterProps = {
	count: number;
	duration: number;
	timerType?: TimerTypes["timerType"];
	resetTimerAction?: () => void;
	shouldFullscreen?: boolean;
};

const CounterContext = React.createContext<CounterProps>({
	count: 0,
	duration: 0,
});

const CounterProvider: React.FC = ({ children }) => {
	const dispatch = useDispatch();

	const { timer, config } = useSelector((state: AppStateTypes) => ({
		timer: state.timer,
		config: state.config,
	}));

	const settings: SettingTypes = useSelector(
		(state: AppStateTypes) => state.settings
	);

	const { preventSleeping, allowSleeping } = useStayAwake();

	const notification = useNotification(
		{
			icon: notificationIcon,
			mute: !settings.notificationSoundOn,
		},
		settings.notificationProperty !== "none"
	);

	const [shouldFullscreen, setShouldFullscreen] = useState(false);

	const [count, setCount] = useState(config.stayFocus * 60);

	const [duration, setDuration] = useState(config.stayFocus * 60);

	const setTimerDuration = useCallback((time: number) => {
		setDuration(time * 60);
		setCount(time * 60);
	}, []);

	const resetTimerAction = useCallback(() => {
		switch (timer.timerType) {
			case STAY_FOCUS:
				setTimerDuration(config.stayFocus);
				break;
			case SHORT_BREAK:
				setTimerDuration(config.shortBreak);
				break;
			case LONG_BREAK:
				setTimerDuration(config.longBreak);
				break;
			case SPECIAL_BREAK:
				setDuration(duration);
				setCount(duration);
				break;
		}
	}, [
		config.longBreak,
		config.stayFocus,
		config.shortBreak,
		timer.timerType,
		duration,
		setDuration,
		setTimerDuration,
	]);

	useEffect(() => {
		if (timer.playing && timer.timerType !== STAY_FOCUS) {
			preventSleeping();
		} else {
			allowSleeping();
		}
	}, [timer.playing, timer.timerType, preventSleeping, allowSleeping]);

	useEffect(() => {
		let interval: number;

		const {
			firstBreak,
			secondBreak,
			thirdBreak,
			fourthBreak,
		} = config.specialBreaks;

		if (timer.playing) {
			interval = setInterval(() => {
				const date = new Date();
				const currentTime =
					padNum(date.getHours()) + ":" + padNum(date.getMinutes());

				if (timer.timerType !== SPECIAL_BREAK) {
					switch (currentTime) {
						case firstBreak.fromTime:
							dispatch(setTimerType("SPECIAL_BREAK"));
							setTimerDuration(firstBreak.duration);
							notification(
								"Special break started.",
								{
									body: `You can now start taking your ${firstBreak.duration} ${
										isEqualToOne(firstBreak.duration) ? "minute" : "minutes"
									} special break.`,
								},
								specialBreakStartedWav
							);
							break;
						case secondBreak.fromTime:
							dispatch(setTimerType("SPECIAL_BREAK"));
							setTimerDuration(secondBreak.duration);
							notification(
								"Special break started.",
								{
									body: `You can now start taking your ${
										secondBreak.duration
									} ${
										isEqualToOne(secondBreak.duration) ? "minute" : "minutes"
									} special break.`,
								},
								specialBreakStartedWav
							);
							break;
						case thirdBreak.fromTime:
							dispatch(setTimerType("SPECIAL_BREAK"));
							setTimerDuration(thirdBreak.duration);
							notification(
								"Special break started.",
								{
									body: `You can now start taking your ${thirdBreak.duration} ${
										isEqualToOne(thirdBreak.duration) ? "minute" : "minutes"
									} special break.`,
								},
								specialBreakStartedWav
							);
							break;
						case fourthBreak.fromTime:
							dispatch(setTimerType("SPECIAL_BREAK"));
							setTimerDuration(fourthBreak.duration);
							notification(
								"Special break started.",
								{
									body: `You can now start taking your ${
										fourthBreak.duration
									} ${
										isEqualToOne(fourthBreak.duration) ? "minute" : "minutes"
									} special break.`,
								},
								specialBreakStartedWav
							);
							break;
						default:
							return;
					}
				} else {
					return clearInterval(interval);
				}
			}, 500);
		}

		return () => clearInterval(interval);
	}, [
		config.specialBreaks,
		timer.timerType,
		timer.playing,
		dispatch,
		notification,
		setTimerDuration,
	]);

	useEffect(() => {
		switch (timer.timerType) {
			case STAY_FOCUS:
				setTimerDuration(config.stayFocus);
				break;
			case SHORT_BREAK:
				setTimerDuration(config.shortBreak);
				break;
			case LONG_BREAK:
				setTimerDuration(config.longBreak);
				break;
		}
	}, [
		setTimerDuration,
		timer.timerType,
		config.stayFocus,
		config.shortBreak,
		config.longBreak,
	]);

	useEffect(() => {
		let timerInterval: number;

		if (timer.playing) {
			timerInterval = setInterval(() => {
				setCount((prevState) => {
					let remaining = prevState - 1;
					return remaining;
				});
			}, 1000);
		}

		return () => clearInterval(timerInterval);
	}, [timer.playing]);

	useEffect(() => {
		if (settings.notificationProperty === "extra") {
			if (count === 61) {
				if (timer.timerType === SHORT_BREAK) {
					notification(
						"60 seconds left.",
						{ body: "Please prepare yourself to stay focused again." },
						settings.enableVoiceAssistance && sixtySecondsLeftWav
					);
				} else if (timer.timerType === LONG_BREAK) {
					notification(
						"60 seconds left.",
						{ body: "Please prepare yourself to stay focused again." },
						settings.enableVoiceAssistance && sixtySecondsLeftWav
					);
				} else if (timer.timerType === SPECIAL_BREAK) {
					notification(
						"60 seconds left.",
						{ body: "Please prepare yourself to stay focused again." },
						settings.enableVoiceAssistance && sixtySecondsLeftWav
					);
				}
			} else if (count === 31 && timer.timerType === STAY_FOCUS) {
				notification(
					"30 seconds left.",
					{ body: "Please pause all media playing if there's one." },
					settings.enableVoiceAssistance && thirtySecondsLeftWav
				);
			}
		}

		if (count === 0) {
			switch (timer.timerType) {
				case STAY_FOCUS:
					if (timer.round < config.sessionRounds) {
						setTimeout(() => {
							notification(
								"Focus time finished.",
								{
									body: `You can now start taking your ${config.shortBreak} ${
										isEqualToOne(config.shortBreak) ? "minute" : "minutes"
									} short break.`,
								},
								settings.enableVoiceAssistance && focusFinishedWav
							);

							dispatch(setTimerType("SHORT_BREAK"));
						}, 1000);
					} else {
						setTimeout(() => {
							notification(
								"Session rounds completed.",
								{
									body: `You can now start taking your ${config.longBreak} ${
										isEqualToOne(config.longBreak) ? "minute" : "minutes"
									} long break.`,
								},
								settings.enableVoiceAssistance && sessionCompletedWav
							);

							dispatch(setTimerType("LONG_BREAK"));
						}, 1000);
					}
					break;

				case SHORT_BREAK:
					setTimeout(() => {
						notification(
							"Break time finished.",
							{
								body: `Stay focused for about ${config.stayFocus} ${
									isEqualToOne(config.stayFocus) ? "minute" : "minutes"
								}.`,
							},
							settings.enableVoiceAssistance && breakFinishedWav
						);

						dispatch(setTimerType("STAY_FOCUS"));
						dispatch(setRound(timer.round + 1));

						if (!settings.autoStartWorkTime) {
							dispatch(setPlay(false));
						}
					}, 1000);
					break;

				case LONG_BREAK:
					setTimeout(() => {
						notification(
							"Break time finished.",
							{
								body: `Stay focused for about ${config.stayFocus} ${
									isEqualToOne(config.stayFocus) ? "minute" : "minutes"
								}.`,
							},
							settings.enableVoiceAssistance && breakFinishedWav
						);

						dispatch(setTimerType("STAY_FOCUS"));
						dispatch(setRound(1));

						if (!settings.autoStartWorkTime) {
							dispatch(setPlay(false));
						}
					}, 1000);
					break;

				case SPECIAL_BREAK:
					setTimeout(() => {
						notification(
							"Break time finished.",
							{
								body: `Stay focused for about ${config.stayFocus} ${
									isEqualToOne(config.stayFocus) ? "minute" : "minutes"
								}.`,
							},
							settings.enableVoiceAssistance && breakFinishedWav
						);

						dispatch(setTimerType("STAY_FOCUS"));

						if (!settings.autoStartWorkTime) {
							dispatch(setPlay(false));
						}
					}, 1000);
					break;
			}
		}
	}, [
		count,
		timer.round,
		timer.playing,
		timer.timerType,
		dispatch,
		notification,
		config.stayFocus,
		config.shortBreak,
		config.longBreak,
		config.sessionRounds,
		settings.notificationProperty,
		settings.autoStartWorkTime,
		settings.enableVoiceAssistance,
	]);

	useEffect(() => {
		if (settings.enableFullscreenBreak) {
			if (timer.timerType !== STAY_FOCUS) {
				setShouldFullscreen(true);
			} else {
				setShouldFullscreen(false);
			}
		}
	}, [settings.enableFullscreenBreak, timer.timerType]);

	return (
		<CounterContext.Provider
			value={{
				count,
				duration,
				resetTimerAction,
				shouldFullscreen,
				timerType: timer.timerType,
			}}
		>
			{children}
		</CounterContext.Provider>
	);
};

export { CounterContext, CounterProvider };
