import MainTabView from '../MainTabView';
import TestView from '../Test';

export const routers = {
  MainTabView: { screen: MainTabView },
  TestView: {
    screen: TestView,
    // path: 'test/:name',
    // navigationOptions: ({ navigation }) => {
    //   return {
    //     title: `${navigation.state.params.name}`,
    //     mode: 'modal',
    //   };
    // },
  },
};

export default routers;
