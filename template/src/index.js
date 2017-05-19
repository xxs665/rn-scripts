import React, { Component } from 'react';
import{ Provider } from 'react-redux';

import AppView from './containers/App';
import { configureStore } from './configureStore';

// react-navigation use these two attribute
console.ignoredYellowBox = ['Warning: View.propTypes', 'Warning: BackAndroid'];

const store = configureStore();

export class MainView extends Component {
  render() {
    return (<Provider store={store}>
      <AppView />
    </Provider>);
  }
}

export default MainView;
