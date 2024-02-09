import bell from "assets/audios/notification-bell.wav";

type OptionProps = {
  mute?: boolean;
} & NotificationOptions;

export const useNotification = (
  constantOptions?: OptionProps,
  notify?: boolean
) => {
  return function (
    title: string,
    options: NotificationOptions,
    audioSrc?: string
  ) {
    const defaultOptions: NotificationOptions = {
      ...constantOptions,
      ...options,
      silent: true,
    };

    // Making sure that notification sound the same
    // in all Operating System

    if (!constantOptions?.mute) {
      if (!audioSrc) {
        new Audio(bell).play().catch((e) => {
          console.warn("There was a problem playing sound", e);
        });
      } else {
        setTimeout(() => {
          new Audio(audioSrc).play().catch((e) => {
            console.warn("There was a problem playing sound", e);
          });
        }, 1500);
      }
    }

    if (!notify) return;
    return new window.Notification(title, defaultOptions);
  };
};
