import {createAction} from './actionsCreator';

export const SET_WATCH_ID = 'SET_WATCH_ID';
export const CREATE_CURRENT_TRACK = 'CREATE_CURRENT_TRACK';
export const ADD_WAYPOINT = 'ADD_WAYPOINT';
export const ADD_NOTE = 'ADD_NOTE';
export const SAVE_CURRENT_TRACK = 'SAVE_CURRENT_TRACK';
export const SET_TRACKS = 'SET_TRACKS';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';

export const setWatchId = createAction(SET_WATCH_ID);
export const createCurrentTrack = createAction(CREATE_CURRENT_TRACK);
export const addWaypoint = createAction(ADD_WAYPOINT);
export const addNote = createAction(ADD_NOTE);
export const saveCurrentTrack = createAction(SAVE_CURRENT_TRACK);
export const setTracks = createAction(SET_TRACKS);
export const setCurrentTrack = createAction(SET_CURRENT_TRACK);
