import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
    };
  }
  render() {
    const { navigation } = this.props;
    return (<View>
      <Text>{'Home'}</Text>
      <Button
        title={'Go to Test View'}
        onPress={() => navigation.navigate('TestView', { name: 'kidd' })}
      />
    </View>);
  }
}

Home.propTypes = {
  navigation: React.PropTypes.object,
};

export default Home;
