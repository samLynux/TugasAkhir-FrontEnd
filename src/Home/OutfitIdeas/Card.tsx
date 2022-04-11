import  React from 'react';
import { Dimensions, Image, ImageRequireSource, StyleSheet} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { add,  interpolateColors } from 'react-native-reanimated';
import { mix,  usePanGestureHandler, withSpring, WithSpringParams } from 'react-native-redash';

import { Box } from '../../components';

const { width: wWidth } = Dimensions.get('window');
const width = wWidth * 0.65
const height = width * (425/294)

interface CardProps{
    position: Animated.Node<number>;
    source: ImageRequireSource;
    onSwipe : () => void;
}
const Card = ({position, source, onSwipe}: CardProps) => {
    const {gestureHandler, translation, velocity, state} = usePanGestureHandler()
    
    const translateYOffset = mix(position,0,-50)

    const translateX = withSpring({
        value: translation.x,
        velocity: velocity.x,
        state,
        snapPoints: [-width * 2, 0, width * 2],
        onSnap: ([x]) => x !== 0 && onSwipe(),
    },)
    
    const translateY = add(
        translateYOffset, withSpring({
        value: translation.y,
        velocity: velocity.y,
        state,
        snapPoints: [0]
    }))

    const scale = mix(position, 1, 0.9)
    const imageScale = mix(position, 1.05, 0.85)
    // const backgroundColor= //@ts-ignore
    //     position === 1? "#C9E9E7" : (position === 0.5? "#74BCBE": "#eb4034")
    const backgroundColor = interpolateColors(
        position,{
            inputRange: [0,1],
            outputColorRange:  ["#C9E9E7", "#74BCBE"] 
        }
    ) ;
  return (
    <>
    <Box style={StyleSheet.absoluteFill} 
        justifyContent="center" alignItems="center"
    >
        <PanGestureHandler {...gestureHandler}>
        <Animated.View //@ts-ignore
            style={{
                backgroundColor, 
                width, height, 
                borderRadius:24,
                transform: [{translateY}, {translateX}, {scale}],
                overflow:"hidden"    
            }}
        >
            <Animated.Image
                {...{source}} 
                style={{
                    ...StyleSheet.absoluteFillObject,
                    width: undefined,
                    height: undefined,
                    transform: [{
                        scale: imageScale
                    }]
                }}
                
            
            />
        </Animated.View>
        </PanGestureHandler>
    </Box>
    </>
  );
}


export default Card;