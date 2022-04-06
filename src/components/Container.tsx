import React, { ReactNode } from 'react';
import { Text, StyleSheet, View, Image, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from './Theme';

export const assets = [require('../../assets/patterns/1.png')];
const { width } = Dimensions.get('window');
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;
const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    // lineHeight: 80,
    fontFamily: 'SFProText-Regular',
    // color:"white",
    textAlign: 'center',
  },
});

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
}

const Container = ({ children, footer }: ContainerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} backgroundColor="secondary">
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
  );
};

export default Container;
