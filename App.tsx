import * as React from 'react';

import { LoadAssets, theme } from './src/components';

import { ThemeProvider } from '@shopify/restyle';
import { AuthNavigator } from './src/Auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { createStackNavigator } from '@react-navigation/stack';
import { HomeNavigator } from './src/Home';
import { AppRoutes } from './src/components/Navigation';
import axios from 'axios';

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
  "SFProDis-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDis-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
  "SFProDis-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDis-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
};





const AppStack = createStackNavigator<AppRoutes>();

export default function App() {
  axios.defaults.baseURL = "http://192.168.1.5:3000/api/";
  axios.defaults.withCredentials = true;
  return (
    <ThemeProvider {...{theme}}>
      
      <LoadAssets {...{fonts}}>
        <SafeAreaProvider>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="Authentication" component={AuthNavigator} />
          <AppStack.Screen name="Home" component={HomeNavigator} />
        </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}