import bell from "assets/audios/notification-bell.wav";

export const useNotification = (
  constantOptions?: NotificationOptions,
  notify?: boolean
) => (title: string, options: NotificationOptions, audioSrc?: string) => {
  const defaultOptions: NotificationOptions = {
    ...options,
    ...constantOptions,
    silent: true,
  };

  // Making sure that notification sound the same
  // in all Operating System
  if (!options.silent) {
    new Audio(bell).play();
  }

  if (audioSrc && !options.silent) {
    setTimeout(() => {
      new Audio(audioSrc).play();
    }, 1000);
  }

  if (!notify) return;
  return new window.Notification(title, defaultOptions);
};
