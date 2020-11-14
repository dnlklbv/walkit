import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {Polyline} from 'react-native-maps';
import BackgroundGeolocation from 'react-native-background-geolocation';

import NoteMarker from '@components/NoteMarker';
import {goBack, showNoteModal} from '@utils/navigation';
import {getRegionByWaypoints, getTrackDistance} from '@utils/map';
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
  track,
  createCurrentTrack,
  addWaypoint,
  currentTrack,
  saveCurrentTrack,
}) => {
  const [followUser, setFollowUser] = useState(true);

  const back = () => goBack(componentId);

  const trackExists = !!track;
  const isTracking = !!currentTrack;

  const notes = trackExists ? track.notes : isTracking && currentTrack.notes;
  const waypoints = trackExists
    ? track.waypoints
    : isTracking && currentTrack.waypoints;
  const region = trackExists ? getRegionByWaypoints(waypoints) : null;

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

  const startTracking = () =>
    createCurrentTrack({
      date: new Date().getTime(),
      title: 'Трек',
    });

  const stopTracking = () => {
    BackgroundGeolocation.removeListeners();

    saveCurrentTrack({
      distance: getTrackDistance(waypoints),
    });

    back();
  };

  const newNote = () => {
    showNoteModal({
      coordinates: currentTrack.waypoints[currentTrack.waypoints.length - 1],
      isNew: true,
    });
  };

  return (
    <>
      <Map
        mapPadding={{top: 30, right: 10, bottom: 50, left: 10}}
        showsUserLocation
        initialRegion={region}
        followsUserLocation={!trackExists && followUser}
        onMapReady={() => {
          setTimeout(() => setFollowUser(false), 1000);
        }}>
        {waypoints && (
          <Polyline
            coordinates={waypoints}
            strokeColor="#FF3767"
            strokeWidth={5}
          />
        )}
        {notes &&
          notes.map((note, idx) => <NoteMarker key={idx} note={note} />)}
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
  addWaypoint: (wp) => dispatch(tracksActions.addWaypoint(wp)),
  saveCurrentTrack: (data) => dispatch(tracksActions.saveCurrentTrack(data)),
  createCurrentTrack: (data) =>
    dispatch(tracksActions.createCurrentTrack(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
