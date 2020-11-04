/**
 * @format
 */

import {Navigation} from 'react-native-navigation';

import {PAGE_NAMES} from '@constants/navigation';
import {withStoreProvider, store} from '@store';
import {initData} from '@store/actions/coreActions';
import Pager from '@views/Pager';
import Map from '@views/Map';
import NoteModal from '@views/NoteModal';

const components = [
  {
    name: PAGE_NAMES.PAGER,
    component: Pager,
  },
  {
    name: PAGE_NAMES.MAP,
    component: Map,
  },
  {
    name: PAGE_NAMES.NOTE_MODAL,
    component: NoteModal,
  },
];

components.forEach(({name, component}) => {
  Navigation.registerComponent(
    name,
    () => withStoreProvider(component),
    () => component,
  );
});

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: PAGE_NAMES.PAGER,
            },
          },
        ],
      },
    },
  });
  store.dispatch(initData());
});
