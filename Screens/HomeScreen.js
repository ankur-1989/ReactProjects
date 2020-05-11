import React, { Component } from 'react';
import { View, Text , StyleSheet, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      displayName: ''
    };
  }

  componentDidMount() {
    const {email, displayName} = firebase.auth().currentUser;
    this.setState({email, displayName})
  }

  signOutUser = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={styles.homeContainer}>
        <Text> {`HI ${this.state.email}`} </Text>
        <TouchableOpacity onPress={this.signOutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Target')}>
          <Text style={styles.buttonText}>Set Target Hours</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Add')}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Start')}>
          <Text style={styles.buttonText}>Start Task</Text>
        </TouchableOpacity>


      </View>
    );
  }
}


const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 15,
    backgroundColor: '#1F9CEE',
    height: 50,
    alignSelf: 'center',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})