import React, { useRef } from 'react';
import { View, StyleSheet,  Image } from 'react-native';

import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { interpolateColor } from 'react-native-redash';
import { theme } from '../../components';


import { AuthNavigationProps } from '../../components/Navigation';
import { aspectRatio, width } from '../../components/Theme';
import Dot from './Dot';
import Slide, { SLIDE_HEIGHT, BORDER_RADIUS } from './Slide';
import Subslide from './Subslide';


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
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    // top: SLIDE_HEIGHT - SLIDE_HEIGHT * 0.61,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  titleContainer: {
    height: 100,
    justifyContent: 'center',
  },
});

const slides = [
  {
    title: 'Relaxed',
    subtitle: 'Find your outfits',
    description: "Confused about your outfit? Don't worry! Find one here!",
    color: '#BFEAF5',
    picture: {
      src: require('../../../assets/1.png'),
      width: 200,
      height: 300,
    },
  },
  {
    title: 'Playful',
    subtitle: 'Hear it First wear it First',
    description: 'Hating clothes in your wardrobe? Explore tens of outfit ideas',
    color: '#f78686',
    picture: {
      src: require('../../../assets/2.png'),
      width: 200,
      height: 300,
    },
  },
  {
    title: 'Exentric',
    subtitle: 'Your Style Your Way',
    description: 'Create Your Individual & Unique style and look amazing everyday',
    color: '#ff5ec9',
    picture: {
      src: require('../../../assets/3.png'),
      width: 200,
      height: 300,
    },
  },
  {
    title: 'Funky',
    subtitle: 'Look Good, Fell Good',
    description: 'Discover the latest trends in fashion and explore your personality',
    color: '#5eff81',
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
      {slides.map(({  picture }, index) => {
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
                width: (aspectRatio *  picture.width * 1.25) ,
                height:(aspectRatio *  picture.height * 1.25)
              }}
            />
          </Animated.View>
        )})}
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
          {slides.map(({ title }, index) => (
            <Slide key={index} {...{ title }} right={!!(index % 2)} />
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
