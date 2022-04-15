import { LinearGradient } from 'expo-linear-gradient';
import  React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';
import { Box,  Text, theme  } from '../../components';
import RoundedIconButton from '../../components/RoundedIconButton';
import { aspectRatio, width } from '../../components/Theme';

interface SwipableRowProps{
    children: React.ReactNode;
    onDelete: () => void;
}
const finalDestination = width;
const snapPoints = [-85 * aspectRatio, 0, width]

// const funcx = () => console.log('11111')


const SwipableRow = ({children, onDelete}: SwipableRowProps) => {
    
    const deleteItem = useCallback(() => {
        onDelete();
    }, [onDelete])
    const translateX = useSharedValue(0) //@ts-ignore
    const onGestureEvent = useAnimatedGestureHandler<{x: number}>({
        onStart: (_, ctx) => { //@ts-ignore
            ctx.x = translateX.value
        },
        onActive: ({translationX}, ctx) => ( //@ts-ignore
            translateX.value = ctx.x + translationX
        ),
        onEnd: ({velocityX}) => {
            const dest = 
                snapPoint(translateX.value, 
                    velocityX, snapPoints
                )
            translateX.value = withSpring(
                dest,
                {
                    overshootClamping:true
                },
                () => {
                    if(dest === finalDestination){
                        deleteItem();
                    }
                }
            )
        }
    })
    const style = useAnimatedStyle(() => ({
        transform: [{translateX: translateX.value}],
        backgroundColor: theme.colors.white
    }))

    const editStyle = useAnimatedStyle(() => ({
        opacity: translateX.value < 0 ? 1 : 0
    }))
    const deleteStyle = useAnimatedStyle(() => ({
        opacity: translateX.value > 0 ? 1 : 0
    }))
  return (
    <>
    <View>
        <Animated.View 
            style={[StyleSheet.absoluteFillObject,editStyle]}
        >
            <LinearGradient 
                style={StyleSheet.absoluteFill}
                colors={["blue","white"]}
                start={[1,0.5]}
                end={[0.7,0.5]}
            />
            <Box 
                padding="m"
                width={-85 * aspectRatio}
                justifyContent="space-evenly" 
                alignSelf="flex-end" 
                alignItems="center"
                flex={1}
            >
                <RoundedIconButton
                    name='plus'
                    size={24}
                    color="white"
                    backgroundColor='primary'
                    onPress={() => alert("Hello")}
                />
                <RoundedIconButton
                    name='minus'
                    size={24}
                    color="white"
                    backgroundColor='light_green'
                    onPress={() => alert("Hello")}
                />
            </Box>
        </Animated.View>
        <Animated.View 
            style={[StyleSheet.absoluteFillObject,deleteStyle]}
        >
            <LinearGradient 
                style={StyleSheet.absoluteFill}
                colors={["red","white"]}
                start={[0,0.5]}
                end={[1,0.5]}
            />
            <Box 
                padding="m"
                width={-85 * aspectRatio}
                justifyContent="space-evenly" 
                alignItems="center"
                flex={1}
            >
                <Text variant="title3">Delete</Text>
            </Box>
        </Animated.View>
        
    {/* @ts-ignore */}
    <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={style}>
            {children}
        </Animated.View>
    </PanGestureHandler>
    </View>
    </>
  );
}

export default SwipableRow;