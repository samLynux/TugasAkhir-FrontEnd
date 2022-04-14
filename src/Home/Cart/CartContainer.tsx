import  React from 'react';
import { Box,  theme } from '../../components';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Dimensions, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { clamp, snapPoint } from 'react-native-redash';


const {width} = Dimensions.get("window")

const aspectRatio = width/375;

const height = 682 * aspectRatio / 1.125
const minHeight = 228 * aspectRatio
const snapPoints = [-(height - minHeight),0, ]



interface CartContainerProps{
    children: React.ReactNode;
}


const CartContainer = ({children}: CartContainerProps) => {
   
    const translateY = useSharedValue(0) //@ts-ignore
    const onGestureEvent = useAnimatedGestureHandler<{y? : number}>({
        onStart: (event, ctx) => { //@ts-ignore
            ctx.y = translateY.value;
        },
        onActive: ({translationY}, ctx) => { //@ts-ignore
            translateY.value = clamp((ctx.y + translationY), snapPoints[0], snapPoints[1]);
        },
        onEnd: ({velocityY}) => {
            const dest = snapPoint(
                translateY.value,
                velocityY, 
                snapPoints
            )
            translateY.value = withSpring(dest, {overshootClamping: true})
        }
    })
    const style = useAnimatedStyle(() => ({
        transform: [{translateY: translateY.value}]
    }))
  return (
    <>
    <Box 
        flex={1}
        backgroundColor="secondary"
    >
        <PanGestureHandler //@ts-ignore
            onGestureEvent={onGestureEvent}
        >
            <Animated.View style={[ style,{
                position:"absolute", 
                top:0,
                left:0,
                right:0,
                height,
                backgroundColor:"white", //@ts-ignore
                borderBottomLeftRadius: theme.borderRadii.xl,//@ts-ignore
                borderBottomRightRadius: theme.borderRadii.xl
            }]}>
                {children}
                <View style={{
                    position:"absolute", 
                    bottom:0,
                    left:0,
                    right:0, //@ts-ignore
                    height:theme.borderRadii.xl,
                    justifyContent:"flex-end",
                    alignItems:"center",
                }}>
                    <View style={{
                        height:5 * aspectRatio,
                        width:60  * aspectRatio,
                        marginBottom:theme.spacing.m,
                        borderRadius:2.5 * aspectRatio,
                        backgroundColor:theme.colors.white
                    }}/>
                </View>
            </Animated.View>
        </PanGestureHandler>
    </Box>
    
    </>
  );
}

export default CartContainer;