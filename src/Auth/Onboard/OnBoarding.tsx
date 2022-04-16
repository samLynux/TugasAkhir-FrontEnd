import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { interpolateColor } from 'react-native-redash';
import { theme } from '../../components';


import { AuthNavigationProps } from '../../components/Navigation';
import Dot from './Dot';
import Slide, { SLIDE_HEIGHT, BORDER_RADIUS } from './Slide';
import Subslide from './Subslide';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding:24,
  },
  slider: {
    height: SLIDE_HEIGHT,
    backgroundColor: 'cyan',
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
    // flexDirection: "row"
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems:"center",
    justifyContent: "flex-end", //@ts-ignore
    borderBottomRightRadius: theme.borderRadii.xl,
    overflow:"hidden"
  }
});

const slides = [
  {
    title: 'Relaxed',
    subtitle: 'Relaxed.Sub',
    description: 'Relaxed.Desc',
    color: '#BFEAF5',
    picture: {
      src: require('../../../assets/1.png'),
      width: 200,
      height: 300,
    },
  },
  {
    title: 'Playful',
    subtitle: 'Playful.Sub',
    description: 'Playful.Desc',
    color: '#BEECC5',
    picture: {
      src: require('../../../assets/2.png'),
      width: 200,
      height: 300,
    },
  },
  {
    title: 'Exentric',
    subtitle: 'Exentric.Sub',
    description: 'Exentric.Desc',
    color: '#FFE4D9',
    picture: {
      src: require('../../../assets/3.png'),
      width: 200,
      height: 300,
    },
  },
  {
    title: 'Funky',
    subtitle: 'Funky.Sub',
    description: 'Funky.Desc',
    color: '#FFDDDD',
    picture: {
      src: require('../../../assets/4.png'),
      width: 200,
      height: 300,
    },
  },
];

const Onboarding = ({ navigation }: AuthNavigationProps<'OnBoarding'>) => {
  const scroll = useRef<Animated.ScrollView>(null);

  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset}) => {
      x.value = contentOffset.x;
    }
  })
  const backgroundColor = useDerivedValue(() => 
    interpolateColor(
      x.value, 
      slides.map((_, i) => i * width),
      slides.map((slide) => slide.color),
  ))
  const slider = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value
  }))

  const background = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value
  }))
  const currentIndex = useDerivedValue(() => x.value / width );
  const footerStyle = useAnimatedStyle(() => ({
    transform: [{translateX: -x.value }]
  }))
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, slider]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {/* {slides.map(({  picture }, index) => {
            const style = useAnimatedStyle(() => ({
              opacity:  interpolate(x.value, 
                [
                  (index - 0.5) * width,
                  index * width,
                  (index + 0.5) * width
                ],
                [0,1,0],
                Extrapolate.CLAMP,
              )
            }))

            return(
              <Animated.View style={[styles.underlay,style]} key={index}>
                <Image
                  source={picture.src}
                  style={{//@ts-ignore
                    width: width - theme.borderRadii.xl,
                    height:(//@ts-ignore
                      (width - theme.borderRadii.xl) * picture.height
                    ) / picture.width
                  }}
                />
              </Animated.View>
            )})} */}



          {slides.map(({ title, picture }, index) => (
            <Slide key={index} {...{ title, picture }} right={!!(index % 2)} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[StyleSheet.absoluteFillObject, background  ]} />
        <Animated.View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={currentIndex} {...{ index, x }} />
            ))}
          </View>
          <Animated.View
            style={[{
              flexDirection: 'row',
              width: width * slides.length,
              flex: 1,
              
            }, footerStyle]}
          >
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1;
              return (
                <Subslide
                  key={index}
                  onPress={() => {
                    if (last) {
                      navigation.navigate('Welcome');
                    }
                    if (scroll.current) {
                      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                      // console.log(index);
                      //@ts-ignore
                      scroll.current?.scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                  }}
                  {...{ subtitle, description, last }}
                />
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;
