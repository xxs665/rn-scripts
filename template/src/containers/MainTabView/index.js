// import React, { Component } from 'react';
// import { View, Text, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Home from '../Home';

const MainTabView = TabNavigator({
  Home: { screen: Home },
  Profile: { screen: Home },
}, {
  swipeEnabled: true,
});

export default MainTabView;
