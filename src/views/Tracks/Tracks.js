import React, {useEffect} from 'react';

import {PAGE_NAMES} from '@constants/navigation';
import {useAppStore} from '@data/';

import {Page} from '../styles';
import {Text} from '@components/Text';
import {LargeButton} from '@components/Button';
import TrackCard from '@components/TrackCard';

const Tracks = ({navigation}) => {
  const [state] = useAppStore();

  const {tracks = []} = state;

  return (
    <Page>
      <LargeButton onPress={() => navigation.navigate(PAGE_NAMES.MAP)}>
        <Text>Записать новый</Text>
      </LargeButton>
      {tracks.map((track, i) => (
        <TrackCard track={track} key={i} navigation={navigation} />
      ))}
    </Page>
  );
};

export default Tracks;
