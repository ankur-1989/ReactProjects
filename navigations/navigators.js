import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Screens/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import SplashScreen from "../Screens/SplashScreen";
import StartTaskScreen from '../Screens/StartTaskScreen';
import TargetHoursScreen from '../Screens/TargetHoursScreen';
import AddTaskScreen from '../Screens/AddTaskScreen';
import TaskList from '../Screens/TaskList';

const MainStack = createStackNavigator();

const AuthStack = createStackNavigator();

const AppStack = createStackNavigator();

const AppStackNavigator = (props) => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="TaskList" component={TaskList}  options={{ headerShown: false }}/>
      <AppStack.Screen name="Add" component={AddTaskScreen}/>
      <AppStack.Screen name="Target" component={TargetHoursScreen}/>
      <AppStack.Screen name="Start" component={StartTaskScreen} />
    </AppStack.Navigator>
  );
};

const AuthStackNavigator = (props) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen name="App" component={AppStackNavigator} options={{ headerShown: false, gestureEnabled: false }} />
        <MainStack.Screen name="Auth" component={AuthStackNavigator}  options={{ headerShown: false, gestureEnabled: false }}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
