import React, {PureComponent} from 'react';

import {Animated} from 'react-native';
import {
  AppBase,
  Header,
  HeaderWrapper,
  ButtonsContainer,
  HeaderButton,
  PagerView,
  FullPageView,
  Title,
} from './styles';
import {Text} from '@components/Text';
import {SCREEN_WIDTH} from '@constants';
import Tracks from '@views/Tracks';
import Statistics from '@views/Statistics';
import Bookmarks from '@views/Bookmarks';

const tabs = [
  {
    key: 'tracks',
    component: Tracks,
    title: 'Треки',
  },
  // {
  //   key: 'journal',
  //   component: Statistics,
  //   title: 'Статистика',
  // },
  // {
  //   key: 'activity',
  //   component: Bookmarks,
  //   title: 'Закладки',
  // },
];

const DEFAULT_SCREEN = 0;

export default class Pager extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: DEFAULT_SCREEN,
    };

    this.scrollX = new Animated.Value(SCREEN_WIDTH * DEFAULT_SCREEN);

    this.onScrollX = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: this.scrollX,
            },
          },
        },
      ],
      {useNativeDriver: false},
    );

    this.scrollX.addListener(({value}) => {
      if (value % SCREEN_WIDTH === 0) {
        const newPage = value / SCREEN_WIDTH;
        this.setTab(newPage);
      }
    });
  }

  componentWillUnmount() {
    this.scrollX.removeAllListeners();
  }

  setTab = (newTab) => this.setState({activeTab: newTab});

  onScrollEnd = ({nativeEvent}) => {
    const {x} = nativeEvent.contentOffset;

    if (x % SCREEN_WIDTH === 0) {
      const newPage = x / SCREEN_WIDTH;
      this.setTab(newPage);
    }
  };

  onTouchSet = (tabIndex) => () => {
    this.setTab(tabIndex);
  };

  renderHeaderTab = (i, key, title) => {
    const screenPosition = SCREEN_WIDTH * i;

    const style = {
      backgroundColor: this.scrollX.interpolate({
        inputRange: [
          screenPosition - 150,
          screenPosition,
          screenPosition + 150,
        ],
        outputRange: ['#fff', '#FAEFD4', '#fff'],
        extrapolate: 'clamp',
      }),
    };

    return (
      <HeaderButton key={key} onPress={this.onTouchSet(i)} style={style}>
        <Text>{title}</Text>
      </HeaderButton>
    );
  };

  renderTabContent = (Component, key, i) => {
    return (
      <FullPageView key={key}>
        <Component componentId={this.props.componentId} />
      </FullPageView>
    );
  };

  render() {
    const {activeTab} = this.state;

    const currentScroll = {x: SCREEN_WIDTH * activeTab};

    return (
      <AppBase>
        <PagerView
          horizontal
          pagingEnabled
          nestedScrollEnabled
          onScroll={this.onScrollX}
          contentOffset={currentScroll}
          showsHorizontalScrollIndicator={false}>
          {tabs.map((tab, i) =>
            this.renderTabContent(tab.component, tab.key, i),
          )}
        </PagerView>
        <HeaderWrapper style={this.headerPosition}>
          <Title>Walkit</Title>
          {/* <Header>
            <ButtonsContainer style={this.headerIconsScale}>
              {tabs.map((tab, i) =>
                this.renderHeaderTab(i, tab.key, tab.title),
              )}
            </ButtonsContainer>
          </Header> */}
        </HeaderWrapper>
      </AppBase>
    );
  }
}
