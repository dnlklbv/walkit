import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

export const makeStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const store = makeStore();

export const withStoreProvider = (C) => (props) => (
  <Provider store={store}>
    <C {...props} />
  </Provider>
);
