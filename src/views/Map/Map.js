import React, {useState, useEffect, useCallback} from 'react';
import geolocation from '@react-native-community/geolocation';
import {Polyline} from 'react-native-maps';

import {WATCH_POSITION_CONFIG} from '@constants/geolocation';
import {useAppStore} from '@data/';

import {
  Map,
  Header,
  ViewTitle,
  CloseButton,
  BlueButton,
  RedButton,
  ButtonRow,
  ButtonLabel,
  ControlsContainer,
} from './styles';

const MapView = ({navigation, route}) => {
  const track = route?.params?.track;
  const [store] = useAppStore();
  const [watchID, setWatchID] = useState(null);

  const trackExists = !!track;
  const isTracking = watchID !== null;

  const setWaypoints = ({coords}) => {
    console.log('coords: ', coords);
  };

  const startTracking = () => {
    const newWatchID = geolocation.watchPosition(
      setWaypoints,
      (error) => console.log(error),
      WATCH_POSITION_CONFIG,
    );

    setWatchID(newWatchID);
  };

  const stopTracking = () => {
    setWatchID(null);
  };

  useEffect(() => {
    return () => geolocation.clearWatch(watchID);
  }, [watchID]);

  return (
    <>
      <Map showsUserLocation>
        {/* <Polyline coordinates={waypoints} strokeColor="#FF3767" strokeWidth={5} /> */}
      </Map>
      <Header>
        <ViewTitle>Walkit</ViewTitle>
        <CloseButton
          onPress={() => {
            navigation.navigate('Pager');
          }}>
          <ViewTitle>X</ViewTitle>
        </CloseButton>
      </Header>
      {!trackExists && (
        <ButtonRow>
          {isTracking && (
            <BlueButton>
              <ButtonLabel>Новая заметка</ButtonLabel>
            </BlueButton>
          )}
          <RedButton onPress={isTracking ? stopTracking : startTracking}>
            <ButtonLabel>
              {isTracking ? 'Завершить трекинг' : 'Новый путь'}
            </ButtonLabel>
          </RedButton>
        </ButtonRow>
      )}
    </>
  );
};

export default MapView;
