import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigations/navigators';
import { AppLoading } from 'expo';
import {Asset} from 'expo-asset';

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

  return (
    !isReady ? <AppLoading 
     startAsync={_loadAssetsAsync}
     onFinish={() => setIsReady(true)}
     onError={console.warn}
    /> : <AppNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
