import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboard from './src/Auth/Onboard';
import { LoadAssets } from './src/components';

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
};


const AuthStack = createStackNavigator();
const AuthNavigator = () => {
  return(
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name='onBoarding' component={Onboard}/>
    </AuthStack.Navigator>
  )
}

export default function App() {
  return (
    <LoadAssets {...{fonts}}>
      <AuthNavigator/>  
    </LoadAssets>
  );
}