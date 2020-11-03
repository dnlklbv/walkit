import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {Polyline} from 'react-native-maps';
import BackgroundGeolocation from 'react-native-background-geolocation';

import {goBack} from '@utils/navigation';
import {GEOLOCATION_CONFIG} from '@constants/geolocation';
import * as tracksActions from '@store/actions/tracksActions';

import {
  Map,
  Header,
  ViewTitle,
  CloseButton,
  BlueButton,
  RedButton,
  ButtonRow,
  ButtonLabel,
} from './styles';

const MapView = ({
  componentId,
  route,
  createCurrentTrack,
  addWaypoint,
  currentTrack,
  saveCurrentTrack,
  addNote,
}) => {
  const track = route?.params?.track;
  const [followUser, setFollowUser] = useState(true);
  const [showNoteForm, setShowNoteForm] = useState(false);

  const back = () => goBack(componentId);

  const trackExists = !!track;
  const isTracking = !!currentTrack;

  const setWaypoints = useCallback(({coords}) => addWaypoint(coords), [
    addWaypoint,
  ]);

  useEffect(() => {
    if (isTracking) {
      BackgroundGeolocation.onLocation(setWaypoints, (e) => console.log(e));
    } else {
      BackgroundGeolocation.removeListeners();
    }
  }, [isTracking, setWaypoints]);

  useEffect(() => {
    BackgroundGeolocation.ready(GEOLOCATION_CONFIG, (state) => {
      console.log('- BackgroundGeolocation is configured : ', state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function () {
          console.log('- Start success');
        });
      }
    });
  }, []);

  const startTracking = () => createCurrentTrack();

  const stopTracking = () => {
    BackgroundGeolocation.removeListeners();
    saveCurrentTrack();
  };

  const newNote = () => {
    // setShowNoteForm(true);
  };

  return (
    <>
      <Map
        showsUserLocation
        showsMyLocationButton
        followsUserLocation={followUser}
        onMapReady={() => {
          setTimeout(() => setFollowUser(false), 1000);
        }}>
        {currentTrack && (
          <Polyline
            coordinates={currentTrack.waypoints}
            strokeColor="#FF3767"
            strokeWidth={5}
          />
        )}
      </Map>
      <Header>
        <ViewTitle>Walkit</ViewTitle>
        <CloseButton onPress={back}>
          <ViewTitle>X</ViewTitle>
        </CloseButton>
      </Header>
      {!trackExists && (
        <ButtonRow>
          {isTracking && (
            <BlueButton onPress={newNote}>
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

const mapStateToProps = ({tracks: {currentTrack}}) => ({
  currentTrack,
});

const mapDispatchToProps = (dispatch) => ({
  createCurrentTrack: () => dispatch(tracksActions.createCurrentTrack()),
  addWaypoint: (wp) => dispatch(tracksActions.addWaypoint(wp)),
  addNote: (note) => dispatch(tracksActions.addNote(note)),
  saveCurrentTrack: () => dispatch(tracksActions.saveCurrentTrack()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
