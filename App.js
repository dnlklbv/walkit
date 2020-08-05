import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import geolocation from '@react-native-community/geolocation';
import {GEOLOCATION_CONFIG} from '@constants/geolocation';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AppStoreProvider} from '@data/';

import {PAGE_NAMES} from '@constants/navigation';

import Pager from '@views/Pager';
import Map from '@views/Map';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    geolocation.setRNConfiguration(GEOLOCATION_CONFIG);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={PAGE_NAMES.PAGER} component={Pager} />
        <Stack.Screen name={PAGE_NAMES.MAP} component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStoreProvider(App);
