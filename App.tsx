import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoadAssets, theme } from './src/components';
import { Welcome, OnBoard } from './src/Auth';
import { ThemeProvider } from '@shopify/restyle';

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};


const AuthStack = createStackNavigator();
const AuthNavigator = () => {
  return(
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name='onBoarding' component={OnBoard}/>
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