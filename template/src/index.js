import React, { Component } from 'react';
import AppView from './App';

// react-navigation use these two attribute
console.ignoredYellowBox = ['Warning: View.propTypes', 'Warning: BackAndroid'];

export class MainView extends Component {
  render() {
    return <AppView />;
  }
}

export default MainView;
