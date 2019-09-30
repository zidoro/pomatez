import { SET_PLAYING, SET_SOUND_ON } from "../actions";

const controlState = {
  isPlaying: false,
  isSoundON: true
};

const controlReducer = (state, action) => {
  switch (action.type) {
    case SET_PLAYING:
      return {
        ...state,
        isPlaying: action.payload
      };
    case SET_SOUND_ON:
      return {
        ...state,
        isSoundON: !state.isSoundON
      };
    default:
      return state;
  }
};

export { controlReducer, controlState };
