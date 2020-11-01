import {takeLatest, select} from 'redux-saga/effects';
import {
  CREATE_CURRENT_TRACK,
  ADD_WAYPOINT,
  SAVE_CURRENT_TRACK,
} from '@store/actions/tracksActions';

const getRealm = ({core: {realm}}) => realm;

function* addCurrentTrack() {
  try {
    const db = yield select(getRealm);
    db.write(() => {
      const user = db.objects('User')[0];
      user.currentTrack = db.create('Track', {
        waypoints: [],
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

function* saveCurrentTrack() {
  try {
    const db = yield select(getRealm);

    db.write(() => {
      const user = db.objects('User')[0];
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

export default [watchAddCurrentTrack, watchAddWaypoint, watchSaveCurrentTrack];
