import React, { Component } from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import { routers } from './routers';

const AppNavigator = StackNavigator(routers);

export class App extends Component {
  render() {
    return (<AppNavigator
      navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })}
    />);
  }
}
App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  nav: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(App);
