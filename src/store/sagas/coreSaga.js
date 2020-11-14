import {takeLatest, put} from 'redux-saga/effects';
import {INIT_DATA, setRealm} from '@store/actions/coreActions';

import {setTracks, setCurrentTrack} from '@store/actions/tracksActions';

import Realm from 'realm';
import schemas from '@realm/schemas';

function* initData() {
  let stateRealm = null;
  let tracks = [];
  let currentTrack = null;

  yield Realm.open({
    schema: schemas,
    schemaVersion: 0,
  })
    .then((realm) => {
      console.log('realm connected');

      stateRealm = realm;

      const user = realm.objects('User')[0];

      if (!user) {
        realm.write(() => {
          realm.create('User', {
            tracks: [],
            currentTrack: null,
          });
        });
      } else {
        tracks = user.tracks.map(
          ({waypoints, notes, date, title, distance}) => ({
            title,
            distance,
            date,
            waypoints: [...waypoints],
            notes: [...notes],
          }),
        );

        currentTrack = !user.currentTrack
          ? null
          : {
              title: user.currentTrack.title,
              distance: user.currentTrack.distance,
              date: user.currentTrack.date,
              waypoints: [...user.currentTrack.waypoints],
              notes: [...user.currentTrack.notes],
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
