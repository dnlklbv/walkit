import {
  SET_WATCH_ID,
  CREATE_CURRENT_TRACK,
  ADD_WAYPOINT,
  SAVE_CURRENT_TRACK,
  SET_TRACKS,
  SET_CURRENT_TRACK,
} from '@store/actions/tracksActions';

const newTrack = {
  waypoints: [],
};

const defaultState = {
  watchId: null,
  currentTrack: null,
  tracks: [],
};

const tracksReducer = (state = defaultState, {type, payload}) => {
  switch (type) {
    case SET_WATCH_ID:
      return {...state, watchId: payload};
    case CREATE_CURRENT_TRACK:
      return {...state, currentTrack: newTrack};
    case ADD_WAYPOINT:
      const {currentTrack} = state;
      return {
        ...state,
        currentTrack: {
          ...currentTrack,
          waypoints: [...currentTrack.waypoints, payload],
        },
      };
    case SAVE_CURRENT_TRACK:
      return {
        ...state,
        tracks: [...state.tracks, state.currentTrack],
        currentTrack: null,
      };
    case SET_TRACKS:
      return {
        ...state,
        tracks: payload,
      };
    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: payload,
      };
    default:
      return state;
  }
};

export default tracksReducer;
