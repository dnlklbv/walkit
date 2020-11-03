import React from 'react';
import {Polyline} from 'react-native-maps';

import {getRegionByWaypoints} from '@utils/map';

import {PAGE_NAMES} from '@constants/navigation';

import {Card, Map, Title, Meta} from './styles';

import {Text} from '@components/Text';

const TrackCard = ({track, navigation}) => {
  const {waypoints} = track;

  // const dateLabel = new Date(date).toLocaleString();

  const region = getRegionByWaypoints(waypoints);

  return (
    <Card onPress={() => navigation.navigate(PAGE_NAMES.MAP, track)}>
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
