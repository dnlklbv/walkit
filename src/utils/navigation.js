import {Navigation} from 'react-native-navigation';

import {PAGE_NAMES} from '@constants/navigation';

export const goBack = (id) => Navigation.pop(id);

export const dismissAllModals = () => Navigation.dismissAllModals();

export const navigateToMap = (id, props = {}) =>
  Navigation.push(id, {
    component: {
      name: PAGE_NAMES.MAP,
      passProps: props,
    },
  });

export const showNoteModal = (props = {}) =>
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: PAGE_NAMES.NOTE_MODAL,
            passProps: props,
          },
        },
      ],
    },
  });
