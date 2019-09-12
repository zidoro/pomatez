import { action } from "easy-peasy";

export default {
  playing: false,
  setPlaying: action(state => {
    state.playing = !state.playing;
  }),

  reset: false,
  next: false,

  soundsOn: true,
  setSoundsOn: action(state => {
    state.soundsOn = !state.soundsOn;
  })
};
