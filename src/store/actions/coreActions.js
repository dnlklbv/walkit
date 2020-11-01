import {createAction} from './actionsCreator';

export const INIT_DATA = 'INIT_DATA';
export const SET_REALM = 'SET_REALM';

export const initData = createAction(INIT_DATA);
export const setRealm = createAction(SET_REALM);
