import {SET_REALM} from '@store/actions/coreActions';

const defaultState = {
  realmL: null,
};

const coreReducer = (state = defaultState, {type, payload}) => {
  switch (type) {
    case SET_REALM:
      return {...state, realm: payload};
    default:
      return state;
  }
};

export default coreReducer;
