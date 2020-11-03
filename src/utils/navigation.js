import {Navigation} from 'react-native-navigation';

import {PAGE_NAMES} from '@constants/navigation';

export const goBack = (id) => Navigation.pop(id);

export const navigateToMap = (id) =>
  Navigation.push(id, {
    component: {
      name: PAGE_NAMES.MAP,
    },
  });
