import  React from 'react';
import { ImageRequireSource, StyleSheet} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {  Extrapolate,  interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { mix, mixColor, snapPoint} from 'react-native-redash';


import { Box } from '../../components';
import { width as wWidth } from '../../components/Theme';


const width = wWidth * 0.65
const height = width * (425/294)
const snapPoints = [-wWidth, 0, wWidth]

interface CardProps{
    source: ImageRequireSource;
    onSwipe : () => void;
    index: number;
    aIndex: Animated.SharedValue<number>;
    step: number
}
const Card = ({step, source, onSwipe, index, aIndex}: CardProps) => {
    
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);

    const position = useDerivedValue(() => (index * step) - aIndex.value)

    const translateYOffset = mix(position.value,0,-50)


    //@ts-ignore
    const onGestureEvent = useAnimatedGestureHandler<{x: number; y: number}>({
        onStart: (_, ctx) => {//@ts-ignore
            ctx.x = translateX.value;//@ts-ignore
            ctx.y = translateYOffset
        },
        onActive: ({translationX, translationY}, ctx) => {//@ts-ignore
            translateX.value = translationX + ctx.x;//@ts-ignore
            translateY.value = translationY + ctx.y;
        },
        onEnd: ({velocityX}) => {
            // translateY.value = withSpring(
            //     0, {velocity: velocityY}
            // );

            const dest = snapPoint(
                translateX.value, velocityX, snapPoints)
            translateX.value = withSpring(
                dest, {
                    overshootClamping: dest === 0 ? false : true,
                    restSpeedThreshold: dest === 0 ? 0.01 : 100,
                    restDisplacementThreshold: dest === 0 ? 0.01 : 100,
                }, () => dest !== 0 && runOnJS(onSwipe)()
            );
        }
    })
    const imageStyle = useAnimatedStyle(() => ({
        transform: [{scale: interpolate(
            position.value,
            [0,step],
            [1.1, 1, 1.1],
            Extrapolate.CLAMP
        )}]
    }))

    const cardStyle = useAnimatedStyle(() => {
        const scale = mix(position.value, 1, 0.9)

        return{
            transform: [
                {translateY:translateYOffset}, 
                {translateX: translateX.value}, 
                {scale}
            ],
            backgroundColor: mixColor(position.value, "#C9E9E7" , "#74BCBE")
        }
    })


    

    
    
    // const backgroundColor= mixColor(position.value, "#C9E9E7" , "#74BCBE")
        

  return (
    <>
    <Box style={StyleSheet.absoluteFill} 
        justifyContent="center" alignItems="center"
    >
        {/* @ts-ignore */}
        <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View //@ts-ignore
            style={[{
                width, height, 
                borderRadius:24,
                overflow:"hidden"    
            }, cardStyle]}
        >
            <Animated.Image
                {...{source}} 
                style={[{
                    ...StyleSheet.absoluteFillObject,
                    width: undefined,
                    height: undefined,
                }, imageStyle]}
                
            
            />
        </Animated.View>
        </PanGestureHandler>
    </Box>
    </>
  );
}


export default Card;