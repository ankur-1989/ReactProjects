import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';

const LoginStack = createStackNavigator();

const AppNavigator = props => {

    return (
        <NavigationContainer>
            <LoginStack.Navigator>
                <LoginStack.Screen name="Login" component={LoginScreen} options= {{headerShown: false}}/>
                <LoginStack.Screen name="Home" component={HomeScreen}/>
            </LoginStack.Navigator>
        </NavigationContainer>
    )

}

export default AppNavigator;