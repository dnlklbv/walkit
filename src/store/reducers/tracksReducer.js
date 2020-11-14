import {
  SET_WATCH_ID,
  CREATE_CURRENT_TRACK,
  ADD_WAYPOINT,
  SAVE_CURRENT_TRACK,
  SET_TRACKS,
  SET_CURRENT_TRACK,
  ADD_NOTE,
} from '@store/actions/tracksActions';

const newTrack = {
  waypoints: [],
  notes: [],
};

const defaultState = {
  watchId: null,
  currentTrack: null,
  tracks: [],
};

const tracksReducer = (state = defaultState, {type, payload}) => {
  const {currentTrack} = state;
  switch (type) {
    case SET_WATCH_ID:
      return {...state, watchId: payload};
    case CREATE_CURRENT_TRACK:
      return {...state, currentTrack: {...payload, ...newTrack}};
    case ADD_WAYPOINT:
      return {
        ...state,
        currentTrack: {
          ...currentTrack,
          waypoints: [...currentTrack.waypoints, payload],
        },
      };
    case ADD_NOTE:
      return {
        ...state,
        currentTrack: {
          ...currentTrack,
          notes: [...currentTrack.notes, payload],
        },
      };
    case SAVE_CURRENT_TRACK:
      return {
        ...state,
        tracks: [...state.tracks, {...payload, ...currentTrack}],
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
