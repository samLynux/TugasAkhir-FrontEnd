import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Text } from '../../components/Theme';

const { width, height } = Dimensions.get('window');
export const BORDER_RADIUS = 75;
export const SLIDE_HEIGHT = 0.61 * height;
const styles = StyleSheet.create({
  container: {
    width,
    // overflow: "hidden"
  },
  titleContainer: {
    height: 100,
    justifyContent: 'center',
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    // top: SLIDE_HEIGHT - SLIDE_HEIGHT * 0.61,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: BORDER_RADIUS,
  },
});

interface SlideProps {
  title: string;
  right?: boolean;
}

const Slide = ({ title, right }: SlideProps) => {
  const transform = [
    { translateY: (SLIDE_HEIGHT - 100) / 2 },
    { translateX: right ? width / 2 - 50 : -width / 2 + 50 },
    { rotate: right ? '-90deg' : '90deg' },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { transform }]}>
        <Text variant={'hero'}>{title}</Text>
      </View>
    </View>
  );
};

export default Slide;
