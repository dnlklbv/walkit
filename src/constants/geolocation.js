import BackgroundGeolocation from 'react-native-background-geolocation';

export const GEOLOCATION_CONFIG = {
  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  distanceFilter: 5,
  stopOnTerminate: false, // Allow the background-service to continue tracking when user closes the app.
};
