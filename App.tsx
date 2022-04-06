import * as React from 'react';

import { LoadAssets, theme } from './src/components';

import { ThemeProvider } from '@shopify/restyle';
import { AuthNavigator } from './src/Auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const fonts = {
  "SFProText-Bold": require("./assets/fonts/SF-Pro-Text-Bold.otf"),
  "SFProText-Semibold": require("./assets/fonts/SF-Pro-Text-Semibold.otf"),
  "SFProText-Regular": require("./assets/fonts/SF-Pro-Text-Regular.otf"),
  "SFProDis-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDis-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
  "SFProDis-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDis-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
};




export default function App() {
  return (
    <ThemeProvider {...{theme}}>
      <LoadAssets {...{fonts}}>
        <SafeAreaProvider>
          <AuthNavigator/>  
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}