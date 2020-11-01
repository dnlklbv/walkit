import {call, all} from 'redux-saga/effects';
import coreSaga from './coreSaga';
import tracksSaga from './tracksSaga';

const allSagas = [...coreSaga, ...tracksSaga];

export default function* rootSaga() {
  yield all(allSagas.map((saga) => call(saga)));
}
