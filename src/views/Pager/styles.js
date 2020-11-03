import styled from 'styled-components/native';
import {H1} from '../../components/Text';
import {SCREEN_WIDTH} from '../../constants';
import {Animated, TouchableOpacity} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const AppBase = styled.View``;

export const HeaderWrapper = styled(Animated.View)`
  padding-top: ${getStatusBarHeight()}px;
  width: 100%;
  position: absolute;
  top: 0;
  background: #fff;
`;

export const Header = styled.View`
  padding: 0 10px 10px;
  background: #fff;
`;

export const ButtonsContainer = styled(Animated.View)`
  width: ${SCREEN_WIDTH}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const Title = styled(H1)`
  padding: 0 10px;
`;

export const HeaderButton = styled(
  Animated.createAnimatedComponent(TouchableOpacity),
)`
  padding: 8px 14px;
  border-radius: 20px;
  margin-right: 10px;
`;

export const PagerView = styled(Animated.ScrollView)`
  width: 100%;
  height: 100%;
`;

export const FullPageView = styled(Animated.ScrollView).attrs({
  contentContainerStyle: {
    paddingTop: getStatusBarHeight(),
    // paddingTop: getStatusBarHeight() + 95,
  },
})`
  width: ${SCREEN_WIDTH}px;
  flex: 1;
  background: #fff;
`;
