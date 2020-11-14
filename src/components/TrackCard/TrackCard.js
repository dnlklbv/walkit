import React, {useMemo} from 'react';
import {Polyline, Marker} from 'react-native-maps';

import {getRegionByWaypoints, humanizeDistance} from '@utils/map';
import {humanizeDate} from '@utils/date';

import {navigateToMap} from '@utils/navigation';

import {Card, Map, Title, Meta} from './styles';

import {Text} from '@components/Text';

const TrackCard = ({track, componentId}) => {
  const {waypoints, notes, date, distance, title} = track;

  const dateString = useMemo(() => humanizeDate(date), [date]);
  const distanceString = useMemo(() => humanizeDistance(distance), [distance]);
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
        <Text>{dateString}</Text>
        <Title fontWeight={600}>{distanceString}</Title>
        <Text fontWeight={600}>{title}</Text>
      </Meta>
    </Card>
  );
};

export default TrackCard;
