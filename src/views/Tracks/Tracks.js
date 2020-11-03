import React from 'react';
import {connect} from 'react-redux';

import {navigateToMap} from '@utils/navigation';
import {Text} from '@components/Text';
import {LargeButton} from '@components/Button';
import TrackCard from '@components/TrackCard';

import {Page} from '../styles';

const Tracks = ({componentId, tracks, currentTrack}) => {
  const navToMap = () => navigateToMap(componentId);
  return (
    <Page>
      <LargeButton onPress={navToMap}>
        <Text>{currentTrack ? 'Продолжить запись' : 'Записать новый'}</Text>
      </LargeButton>
      {tracks.map((track, i) => (
        <TrackCard track={track} key={i} />
      ))}
    </Page>
  );
};

const mapStateToProps = ({tracks: {tracks, currentTrack}}) => ({
  tracks,
  currentTrack,
});

export default connect(mapStateToProps)(Tracks);
