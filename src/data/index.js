import React, {createContext, useContext, useMemo} from 'react';

import AppDatabase from './database';

let initialState = {};

const AppStore = createContext(initialState);

export const AppStoreProvider = (Component) => {
  class AppStoreWrapped extends React.PureComponent {
    state = {loaded: false};
    realm = {};

    updateRealm = (patch, callback) => {
      this.setState(patch);

      if (this.realm) {
        AppDatabase.write(() => {
          Object.keys(patch).forEach((key) => {
            this.realm[key] = patch[key];
          });
        });

        if (callback) {
          callback();
        }
      }
    };

    componentDidMount() {
      const tracks = AppDatabase.get();

      this.setState({
        ...tracks,
        loaded: true,
      });
      this.realm = tracks || {};

      AppDatabase.store.addListener(this.changeListener);
    }

    componentWillUnmount() {
      AppDatabase.store.removeListener(this.changeListener);
    }

    changeListener = () => {
      const tracks = AppDatabase.get();

      this.realm = tracks;

      this.setState({
        ...tracks,
        loaded: true,
      });
    };

    utils = {
      db: AppDatabase,
    };

    render() {
      return (
        <AppStore.Provider
          value={{
            store: this.state,
            setStore: this.updateRealm,
            utils: this.utils,
          }}>
          <Component {...this.props} />
        </AppStore.Provider>
      );
    }
  }

  return AppStoreWrapped;
};

export const useAppStore = (selectors = []) => {
  const {setStore, store, utils} = useContext(AppStore);

  const requestedValues = useMemo(() => {
    let values = {...store};

    for (let index = 0; index < selectors.length; index++) {
      const selector = selectors[index];
      values[selector] = store[selector];
    }

    return values;
  }, [store, selectors]);

  return [requestedValues, setStore, utils];
};
