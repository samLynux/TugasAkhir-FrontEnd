import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoadAssets, theme } from './src/components';
import { Welcome, OnBoard } from './src/Auth';
import { ThemeProvider } from '@shopify/restyle';
import { Routes } from './src/components/Navigation';

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
  "SFProDis-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDis-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
  "SFProDis-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDis-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
};


const AuthStack = createStackNavigator<Routes>();
const AuthNavigator = () => {
  return(
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name='OnBoarding' component={OnBoard}/>
      <AuthStack.Screen name='Welcome' component={Welcome}/>
    </AuthStack.Navigator>
  )
}

export default function App() {
  return (
    <ThemeProvider {...{theme}}>
      <LoadAssets {...{fonts}}>
        <AuthNavigator/>  
      </LoadAssets>
    </ThemeProvider>
  );
}