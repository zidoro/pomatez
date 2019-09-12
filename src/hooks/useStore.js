import { useStoreState, useStoreActions } from "easy-peasy";

function useStore() {
  /** Control Model */
  const { playing, soundsOn } = useStoreState(({ control }) => ({
    playing: control.playing,
    soundsOn: control.soundsOn
  }));
  const { setPlaying, setSoundsOn } = useStoreActions(({ control }) => ({
    setPlaying: control.setPlaying,
    setSoundsOn: control.setSoundsOn
  }));

  /** Navigation Model */
  const { title, showConfig } = useStoreState(({ nav }) => ({
    title: nav.title,
    showConfig: nav.showConfig
  }));
  const { setShowConfig, setTitle } = useStoreActions(({ nav }) => ({
    setShowConfig: nav.setShowConfig,
    setTitle: nav.setTitle
  }));

  /** Setting Model */
  const { onTop, notify, darkMode, showSetting } = useStoreState(
    ({ setting }) => ({
      onTop: setting.onTop,
      notify: setting.notify,
      darkMode: setting.darkMode,
      showSetting: setting.showSetting
    })
  );
  const { setOnTop, setNotify, setDarkMode, setShowSetting } = useStoreActions(
    ({ setting }) => ({
      setOnTop: setting.setOnTop,
      setNotify: setting.setNotify,
      setDarkMode: setting.setDarkMode,
      setShowSetting: setting.setShowSetting
    })
  );

  return {
    states: {
      title,
      showConfig,

      playing,
      soundsOn,

      onTop,
      notify,
      darkMode,
      showSetting
    },
    actions: {
      setTitle,
      setShowConfig,

      setPlaying,
      setSoundsOn,

      setOnTop,
      setNotify,
      setDarkMode,
      setShowSetting
    }
  };
}

export default useStore;
