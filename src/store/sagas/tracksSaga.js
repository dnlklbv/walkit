import {takeLatest, select} from 'redux-saga/effects';
import {
  CREATE_CURRENT_TRACK,
  ADD_WAYPOINT,
  SAVE_CURRENT_TRACK,
  ADD_NOTE,
} from '@store/actions/tracksActions';

const getRealm = ({core: {realm}}) => realm;

function* addCurrentTrack({payload}) {
  try {
    const db = yield select(getRealm);
    db.write(() => {
      const user = db.objects('User')[0];
      user.currentTrack = db.create('Track', {
        ...payload,
        waypoints: [],
        notes: [],
      });
    });
  } catch (e) {
    console.log(e);
  }
}

export function* watchAddCurrentTrack() {
  yield takeLatest(CREATE_CURRENT_TRACK, addCurrentTrack);
}

function* addWaypoint({payload}) {
  try {
    const db = yield select(getRealm);

    db.write(() => {
      const user = db.objects('User')[0];
      user.currentTrack.waypoints.push(db.create('Coordinates', payload));
    });
  } catch (e) {
    console.log(e);
  }
}

export function* watchAddWaypoint() {
  yield takeLatest(ADD_WAYPOINT, addWaypoint);
}

function* addNote({payload}) {
  try {
    const db = yield select(getRealm);

    db.write(() => {
      const user = db.objects('User')[0];
      user.currentTrack.notes.push(db.create('Note', payload));
    });
  } catch (e) {
    console.log(e);
  }
}

export function* watchAddNote() {
  yield takeLatest(ADD_NOTE, addNote);
}

function* saveCurrentTrack({payload}) {
  try {
    const db = yield select(getRealm);

    db.write(() => {
      const user = db.objects('User')[0];
      for (const key in payload) {
        user.currentTrack[key] = payload[key];
      }
      user.tracks.push(user.currentTrack);
      user.currentTrack = null;
    });
  } catch (e) {
    console.log(e);
  }
}

export function* watchSaveCurrentTrack() {
  yield takeLatest(SAVE_CURRENT_TRACK, saveCurrentTrack);
}

export default [
  watchAddCurrentTrack,
  watchAddWaypoint,
  watchAddNote,
  watchSaveCurrentTrack,
];
