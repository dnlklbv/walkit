import React from 'react';
import {connect} from 'react-redux';

import {PAGE_NAMES} from '@constants/navigation';

import {Page} from '../styles';
import {Text} from '@components/Text';
import {LargeButton} from '@components/Button';
import TrackCard from '@components/TrackCard';

const Tracks = ({navigation, tracks, currentTrack}) => {
  return (
    <Page>
      <LargeButton onPress={() => navigation.navigate(PAGE_NAMES.MAP)}>
        <Text>{currentTrack ? 'Продолжить запись' : 'Записать новый'}</Text>
      </LargeButton>
      {tracks.map((track, i) => (
        <TrackCard track={track} key={i} navigation={navigation} />
      ))}
    </Page>
  );
};

const mapStateToProps = ({tracks: {tracks, currentTrack}}) => ({
  tracks,
  currentTrack,
});

export default connect(mapStateToProps)(Tracks);
