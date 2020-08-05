import styled from 'styled-components/native';
import MapView from 'react-native-maps';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Text} from '../../components/Text';

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const Header = styled.View`
  position: absolute;
  top: 0;
  padding: 25px;
  padding-top: ${getStatusBarHeight()}px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ViewTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const CloseButton = styled.TouchableOpacity``;

export const ButtonRow = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 50px;
`;

export const BlueButton = styled.TouchableOpacity`
  padding: 6px 20px;
  margin: 5px;
  height: 32px;
  background: #3793ff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.1);
  border-radius: 38.5px;
  align-items: center;
  justify-content: center;
`;

export const RedButton = styled(BlueButton)`
  background: #ff4a8b;
`;

export const ButtonLabel = styled(Text)`
  color: #fff;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
`;
