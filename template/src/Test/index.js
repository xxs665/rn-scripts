import React, { Component } from 'react';
import { View, Button } from 'react-native';

export class TestView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state: { params } } = navigation;
    return {
      title: `hello ${params.name}`,
      // header: null,
    };
  }
  render() {
    const { navigation } = this.props;
    return (<View>
      <Button
        title={'Navigate'}
        color={'#841584'}
        onPress={() => navigation.navigate('MainTabView', { name: 'kidd' })}
        accessibilityLabel="This sounds great!"
      />
    </View>);
  }
}

TestView.propTypes = {
  navigation: React.PropTypes.object,
};

export default TestView;
