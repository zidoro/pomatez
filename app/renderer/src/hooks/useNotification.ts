import bell from "assets/audios/notification-bell.wav";

type OptionProps = {
	mute?: boolean;
} & NotificationOptions;

export const useNotification = (
	constantOptions?: OptionProps,
	notify?: boolean,
) => {
	return function (
		title: string,
		options: NotificationOptions,
		audioSrc?: string,
	) {
		const defaultOptions: NotificationOptions = {
			...constantOptions,
			...options,
			silent: true,
		};

		// Making sure that notification sound the same
		// in all Operating System

		if (!constantOptions?.mute) {
			new Audio(bell).play();

			if (audioSrc) {
				setTimeout(() => {
					new Audio(audioSrc).play();
				}, 1500);
			}
		}

		if (!notify) return;
		return new window.Notification(title, defaultOptions);
	};
};
