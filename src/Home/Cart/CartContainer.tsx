import  React  from 'react';
import { Box,  theme } from '../../components';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { clamp, snapPoint } from 'react-native-redash';
import CheckoutComponent from './Checkout';
import { aspectRatio } from '../../components/Theme';



const height = 600 * aspectRatio
const minHeight = 114 * aspectRatio
const snapPoints = [-(height - minHeight),0, ]



interface CartContainerProps{
    children: React.ReactNode;
    total: number;
    // checkoutComponent: FC<{minHeight: number}>;
}


const CartContainer = ({children, total}: CartContainerProps) => {
   
   
    const translateY = useSharedValue(0) //@ts-ignore
    const onGestureEvent = useAnimatedGestureHandler<{y? : number}>({
        onStart: (_, ctx) => { //@ts-ignore
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
    <Box flex={1}
        backgroundColor="secondary">
    <CheckoutComponent total={total} minHeight={minHeight}/>
    <PanGestureHandler //@ts-ignore
        onGestureEvent={onGestureEvent}
    >
        

            <Animated.View style={[ style,{
                position:"absolute", 
                top:0,
                left:0,
                right:0,
                height: height * 1.1,
                backgroundColor:"white", 
            }]}>
                {children}
                <View style={{
                    position:"absolute", 
                    bottom:0,
                    left:0,
                    right:0, //@ts-ignore
                    height:theme.borderRadii.xl,
                    justifyContent:"flex-end",
                    alignItems:"center",//@ts-ignore
                    borderTopLeftRadius: theme.borderRadii.xl,//@ts-ignore
                    borderTopRightRadius: theme.borderRadii.xl,
                    backgroundColor:theme.colors.secondary
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