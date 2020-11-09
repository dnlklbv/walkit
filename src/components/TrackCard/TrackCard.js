import React from 'react';
import {Polyline, Marker} from 'react-native-maps';

import {getRegionByWaypoints} from '@utils/map';

import {navigateToMap} from '@utils/navigation';

import {Card, Map, Title, Meta} from './styles';

import {Text} from '@components/Text';

const TrackCard = ({track, componentId}) => {
  const {waypoints, notes} = track;

  const region = getRegionByWaypoints(waypoints);

  const openMap = () => navigateToMap(componentId, {track});

  return (
    <Card onPress={openMap}>
      <Map
        initialRegion={region}
        showsUserLocation
        scrollEnabled={false}
        zoomEnabled={false}>
        <Polyline
          coordinates={waypoints}
          strokeColor="#FF3767"
          strokeWidth={5}
        />
        {notes.map((note, idx) => (
          <Marker key={idx} coordinate={note.coordinates} />
        ))}
      </Map>
      <Meta>
        {/* <Text>{dateLabel}</Text>
        <Title fontWeight={600}>{length}</Title>
        <Text fontWeight={600}>{location}</Text> */}
      </Meta>
    </Card>
  );
};

export default TrackCard;
