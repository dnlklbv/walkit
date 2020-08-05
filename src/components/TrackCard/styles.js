import styled from 'styled-components/native';
import MapView from 'react-native-maps';

import {H1} from '@components/Text';

export const Card = styled.TouchableOpacity`
  margin-top: 20px;
  width: 100%;
  border: 0.5px solid #b1b1b1;
  border-radius: 10px;
  overflow: hidden;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 200px;
`;

export const Meta = styled.View`
  padding: 10px;
  padding-bottom: 20px;
`;

export const Title = styled(H1)`
  margin: 5px 0;
`;
