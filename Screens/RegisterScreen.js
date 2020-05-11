import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions} from 'react-native';
import * as firebase from 'firebase';


const {width, height} = Dimensions.get('window');

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        email: '',
        password: '',
        errorMessage: null

    };
  }

  handleSignUp = () => {
      const {email, password} = this.state;
   firebase.auth().createUserWithEmailAndPassword(email,password).then(credentials => {
       return credentials.user.updateProfile({
           displayName: this.state.name
       })
   }).catch(error => this.setState({errorMessage: error.message}))
  }


  render() {
    return (
      <View style={styles.container}>

         <Image style={{height: 100, width: 100, alignSelf: 'center', marginTop: height/4 - 100}} source ={require('../assets/logo.png')} />
         <Text style={styles.greeting}>Welcome to TimeTracker</Text>

        <View style={styles.form}>


        <View style={{width: '100%'}}>
         <Text style={styles.inputTitle}>Full Name</Text> 
        <TextInput autoCapitalize='none' autoCorrect={false} style={styles.textInput} value={this.state.name} onChangeText={name => this.setState({name})}/>
        </View>   
 
        <View style={{width: '100%'}}>
         <Text style={styles.inputTitle}>Email address</Text> 
        <TextInput autoCapitalize='none' autoCorrect={false} style={styles.textInput} value={this.state.email} onChangeText={email => this.setState({email})}/>
        </View>

        <View style={{width: '100%'}}>
         <Text style={styles.inputTitle}>Password</Text> 
        <TextInput secureTextEntry autoCapitalize='none' autoCorrect={false} style={styles.textInput} value={this.state.password} onChangeText={password => this.setState({password})}/>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={this.handleSignUp}>
           
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>Register</Text>
         
        </TouchableOpacity>

        </View>
      </View>
    );
  }
}


const styles =StyleSheet.create({
    container: {
        flex: 1,
         
    },
    greeting: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textInput: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '85%',
        height: 20,
        borderBottomColor: 'grey',
        marginVertical: 15,
        alignSelf: 'center',
        
        fontSize: 18
    },
    inputTitle: {
   
      marginLeft: 30,
      fontSize: 16,
      color:  'grey'
    },
    registerButton: {
        borderRadius: 15,
        backgroundColor: '#1F9CEE',
        height: 50,
        alignSelf: 'center',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    form: {
       
        marginTop: 50,
        marginHorizontal: 25,
        
      
    }
})