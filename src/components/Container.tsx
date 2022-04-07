import React, { ReactNode } from 'react';
import {  StyleSheet,  Image, Dimensions, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from './Theme';

export const assets = [require('../../assets/patterns/1.png')];
const { width, height:wHeight } = Dimensions.get('window');
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;


interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
}

const Container = ({ children, footer }: ContainerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView scrollEnabled={false}>
    <Box height={wHeight} backgroundColor="secondary">
      <StatusBar barStyle="light-content" />
      <Box backgroundColor="white">
        <Box
          overflow="hidden"
          height={height * 0.61}
          //@ts-ignore
          borderBottomLeftRadius="xl"
        >
          <Image source={assets[0]} style={{ width, height, borderBottomLeftRadius: 75 }} />
        </Box>
      </Box>
      <Box flex={1} overflow="hidden">
        <Image
          source={assets[0]}
          style={{
            width,
            height,
            ...StyleSheet.absoluteFillObject,
            borderBottomLeftRadius: 75,
            top: -height * 0.61,
          }}
        />
        
        <Box //@ts-ignore
          borderRadius="xl"
          borderTopLeftRadius={0}
          backgroundColor="white"
          flex={1}
        >
          
            {children}
          
        </Box>
      </Box>
      
      <Box backgroundColor="secondary" paddingTop="m"> 
        {footer}
        <Box height={insets.bottom} />
      </Box>
    </Box>
    </KeyboardAwareScrollView>
  );
};

export default Container;
