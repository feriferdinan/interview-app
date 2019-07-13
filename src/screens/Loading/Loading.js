import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
import withNavigation from 'react-navigation'
import { connect } from 'react-redux';
 class Loading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const uid = await AsyncStorage.getItem('uid');
    this.props.navigation.navigate(uid ? 'Home' : 'Register');
  };
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


export default Loading;
