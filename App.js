import React, {useState} from 'react';
import { YellowBox } from 'react-native';
import {logger} from 'redux-logger';
import AppNavigator from './navigations/navigators';
import { AppLoading } from 'expo';
import FlashMessage from 'react-native-flash-message';
import {Asset} from 'expo-asset';
import * as firebase from 'firebase';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import targetReducer from './store/reducers/target';
import taskReducer from './store/reducers/task';

const rootReducer = combineReducers({
  task: taskReducer,
  target: targetReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk, logger)); 

var firebaseConfig = {
  apiKey: "AIzaSyBVuqRRbOcmGiRajvjdR9p94JSz6FGhYA0",
  authDomain: "timetracker-72258.firebaseapp.com",
  databaseURL: "https://timetracker-72258.firebaseio.com",
  projectId: "timetracker-72258",
  storageBucket: "timetracker-72258.appspot.com",
  messagingSenderId: "678005082041",
  appId: "1:678005082041:web:7fee1e3c3165cee7775868",
  measurementId: "G-SZV18EWFHE"
};
// Initialize Firebase
const app =  firebase.initializeApp(firebaseConfig);
export const db = app.database();
  
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function App() {

  const [isReady, setIsReady] = useState(false); 
  const _loadAssetsAsync = async ()  => {
  const imageAssets = cacheImages([
      require('./assets/bg.jpg'),
    ]);

    await Promise.all([...imageAssets]);
  }

 
 YellowBox.ignoreWarnings(['Setting a timer']);

  return (
    !isReady ? <AppLoading 
     startAsync={_loadAssetsAsync}
     onFinish={() => setIsReady(true)}
     onError={console.warn}
    /> : 
    <Provider store={store}>
     <AppNavigator/>
     <FlashMessage/>
    </Provider>
  );
}

