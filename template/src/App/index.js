import React, { Component } from 'react';

import Screen from './Screen';

export class App extends Component {
  render() {
    return (<Screen
      // onNavigationStateChange={(prevState, currentState) => console.log(prevState, currentState)}
    />);
  }
}


export default App;
