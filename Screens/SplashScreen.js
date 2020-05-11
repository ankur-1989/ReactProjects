import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ?  'App': 'Auth');
      });
  }

  render() {
    return (
      <View style={styles.container}>
      <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    
 container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
 }

});
