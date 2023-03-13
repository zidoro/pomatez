import { assign, createMachine } from "xstate";
import { ConfigProps, SettingsProps } from "./types";
import { defaultConfig, defaultSettings } from "./constants";

export const appMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqDEBjA9gOwDMBLKAOiwAtk8YBtABgF1FRUdYiAXI-FkAD0QAmAIwjSADhFCArABoQAT2EBOFZJkqAzAHYZAX30K0mXIRKkATnDCcGzJCDYduvR4IQiALDtKyFyghC9FqkKvQAbLKGxugYsLbcNLDkVDRg9nzOXDx4fB7BMqTeEl668kqIIvS+KjJa0gZGICbxiUTJVjZ2TFnsOW6gHiJaRRERXpH+lZ5CMS3opNwAtmCWpKgANsiKHVAYK2tLOFBQmxm9jtmuee5VEuo6IY0BiHr0pA3RzSZLRKvrVDIACuCQgB3+R04JzOFwcrH6N3y90ez2mgQk9A+Um+sVQpFgOGBeAgBNQYGQAGs1gB5PDxIkk46nc6ZK6I3LIoLeMKiCR6V6eehiT6Nea-QnE0mwclU2kEAgMqXM2FshEuTl3bleXkifkVQIqCLYsU-RbLHAQMCkK0EEGbTgYC1WlWsy7qga3Ib3Xz0bQCmaaD5fJp40jO624ZZArCOiOuuF9DWDAQ+0h+8qC+rqHFNZp4S1wPgmJOerkAWhEKkFWgmklNYcOllLSK1QmrM3GQnruIW+KbG22uxoLc13oQWkmnyEucFegkkjqEi0K9XK684sWA6BoMgo5THh0OjnMginyXa7XG7N+MlJP3XtTQQ7GJ0oRDm9vjOlsupljpD5ckegpGmeDwyMul6rp+BLfmSFJ-jSCqAVquihBEp7oogRrqFoF5QSuMERih47toKXgyN2H43uGhY2mAdrAg6JFPsBgYUYuEEEZORF0VGMacCxHiTuIEQ6HqAaBDIXgLnhXEEdehhAA */
    id: "app",
    schema: {
      context: {} as {
        config: ConfigProps;
        settings: SettingsProps;
      },
      events: {} as
        | {
            type: "config.change";
            values: ConfigProps;
          }
        | { type: "config.reset" }
        | {
            type: "settings.change";
            values: SettingsProps;
          }
        | { type: "settings.reset" }
        | { type: "timer.toggle" }
        | { type: "sound.toggle" }
        | { type: "mode.toggle" },
    },
    tsTypes: {} as import("./app.typegen").Typegen0,
    context: {
      config: defaultConfig,
      settings: defaultSettings,
    },
    type: "parallel",
    states: {
      timer: {
        initial: "paused",
        states: {
          playing: {
            on: {
              "timer.toggle": "paused",
            },
          },
          paused: {
            on: {
              "timer.toggle": "playing",
            },
          },
        },
      },
      sound: {
        initial: "speakerOn",
        states: {
          speakerOn: {
            on: {
              "sound.toggle": "speakerOff",
            },
          },
          speakerOff: {
            on: {
              "sound.toggle": "speakerOn",
            },
          },
        },
      },
      mode: {
        initial: "default",
        states: {
          default: {
            on: {
              "mode.toggle": "compact",
            },
          },
          compact: {
            on: {
              "mode.toggle": "default",
            },
          },
        },
      },
    },
    on: {
      "config.change": {
        actions: "updateConfig",
      },
      "config.reset": {
        cond: "isNotDefaultConfig",
        actions: "resetConfig",
      },
      "settings.change": {
        actions: "updateSettings",
      },
      "settings.reset": {
        cond: "isNotDefaultSettings",
        actions: "resetSettings",
      },
    },
  },
  {
    guards: {
      isNotDefaultConfig: (context) => {
        return (
          JSON.stringify(context.config) !==
          JSON.stringify(defaultConfig)
        );
      },
      isNotDefaultSettings: (context) => {
        return (
          JSON.stringify(context.settings) !==
          JSON.stringify(defaultSettings)
        );
      },
    },
    actions: {
      updateConfig: assign((_, event) => {
        return {
          config: event.values,
        };
      }),
      resetConfig: assign((context) => {
        return {
          ...context,
          config: defaultConfig,
        };
      }),
      updateSettings: assign((_, event) => {
        return {
          settings: event.values,
        };
      }),
      resetSettings: assign((context) => {
        return {
          ...context,
          settings: defaultSettings,
        };
      }),
    },
  }
);
