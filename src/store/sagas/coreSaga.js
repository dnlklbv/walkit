import {takeLatest, put} from 'redux-saga/effects';
import {INIT_DATA, setRealm} from '@store/actions/coreActions';

import {setTracks, setCurrentTrack} from '@store/actions/tracksActions';

import Realm from 'realm';
import {UserSchema, TrackSchema, CoordinatesSchema} from '@realm/schemas';

function* initData() {
  let stateRealm = null;
  let tracks = [];
  let currentTrack = null;

  yield Realm.open({
    schema: [UserSchema, TrackSchema, CoordinatesSchema],
    schemaVersion: 0,
  })
    .then((realm) => {
      console.log('realm connected');

      stateRealm = realm;

      const user = realm.objects('User')[0];

      if (!user) {
        realm.write(() => {
          const currentTrack = realm.create('Track', {waypoints: []});
          realm.create('User', {
            tracks: [],
            currentTrack,
          });
        });
      } else {
        tracks = user.tracks.map(({waypoints}) => ({
          waypoints: [...waypoints],
        }));

        currentTrack = !user.currentTrack
          ? null
          : {
              waypoints: [...user.currentTrack.waypoints],
            };
      }
    })
    .catch((e) => {
      console.warn('realm error', e);
    });

  yield put(setRealm(stateRealm));
  yield put(setTracks(tracks));
  yield put(setCurrentTrack(currentTrack));
}

export function* watchInitData() {
  yield takeLatest(INIT_DATA, initData);
}

export default [watchInitData];
