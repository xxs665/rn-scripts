import { StackNavigator } from 'react-navigation';

import MainTabView from '../MainTabView';
import TestView from '../Test';

export const Screen = StackNavigator({
  MainTabView: { screen: MainTabView },
  TestView: {
    screen: TestView,
    path: 'test/:name',
    navigationOptions: ({ navigation }) => {
      return {
        title: `${navigation.state.params.name}`,
        mode: 'modal',
      };
    },
  },
}, {
  mode: 'card',
});

export default Screen;
