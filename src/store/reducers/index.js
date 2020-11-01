import {combineReducers} from 'redux';
import core from './coreReducer';
import tracks from './tracksReducer';

const rootReducer = combineReducers({
  core,
  tracks,
});

export default rootReducer;
