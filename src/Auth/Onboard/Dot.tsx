import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, interpolateColors } from 'react-native-reanimated';



interface DotProps{
    index: number;
    currentIndex: Animated.Node<number>
}

const Dot = ({index,currentIndex}: DotProps) => {
    
    const opacity = interpolate(currentIndex, {
        inputRange: [index -1, index, index + 1],
        outputRange: [0.5, 1, 0.5],
        extrapolate: Extrapolate.CLAMP
        }
    ) 
    const scale = interpolateColors(currentIndex, {
        inputRange: [index -1, index, index + 1],
        outputRange: [1, 1.25, 1],
        extrapolate: Extrapolate.CLAMP
        }
    )


    return( 
    <Animated.View style={{
        opacity,
        backgroundColor: "red", width: 8,
        height: 8, borderRadius: 4,
        margin:4,
        transform: [{scale}]
        }}>
        
    </Animated.View>
    )
}

export default Dot;