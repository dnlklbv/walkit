import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {PAGE_NAMES} from '@constants/navigation';

import Pager from '@views/Pager';
import Map from '@views/Map';

import {initData} from '@store/actions/coreActions';
import {store} from '@store';

const {dispatch} = store;

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    dispatch(initData());
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={PAGE_NAMES.PAGER} component={Pager} />
          <Stack.Screen name={PAGE_NAMES.MAP} component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
