import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
//@ts-ignore
import Animated, { divide, interpolateColors, multiply } from 'react-native-reanimated';

import { useScrollHandler } from 'react-native-redash';
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
    // backgroundColor:"green",
    // flex:1
  },
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
//@ts-ignore
const Onboarding = ({ navigation }: AuthNavigationProps<'OnBoarding'>) => {
  const scroll = useRef<Animated.ScrollView>();

  // const x = useValue(0)
  const { scrollHandler, x } = useScrollHandler();
  //@ts-ignore
  const backgroundColor = interpolateColors(x, {
    inputRange: slides.map((_, i) => i * width),
    outputColorRange: slides.map((slide) => slide.color),
  }) as any;
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, {backgroundColor}]}>
        <Animated.ScrollView
          //@ts-ignore
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}
        >
          {slides.map(({ title, picture }, index) => (
            <Slide key={index} {...{ title, picture }} right={!!(index % 2)} />
          ))}
          {/* {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1;
              return (
                <Subslide
                  key={index}
                  onPress={() => {
                    if (last) {
                      navigation.navigate('Welcome');
                    }
                    // console.log("yyyy");
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
            })} */}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} />
        <Animated.View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={divide(x, width)} {...{ index, x }} />
            ))}
          </View>
          <Animated.View
            style={{
              flexDirection: 'row',
              width: width * slides.length,
              flex: 1,
              transform: [{ translateX: multiply(x, -1) }],
            }}
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
                    // console.log("yyyy");
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
