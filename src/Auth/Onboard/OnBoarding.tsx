import React, {  useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { multiply } from 'react-native-reanimated';

import { useValue, onScrollEvent, interpolateColor } from  "react-native-redash";
import Slide, {SLIDE_HEIGHT} from './Slide';
import Subslide from './Subslide';
                     
const BORDER_RADIUS = 75;
const {width} = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        // padding:24,
    },
    slider: {
        height: SLIDE_HEIGHT,
        backgroundColor: "cyan",
        borderBottomRightRadius:BORDER_RADIUS,
        
    },
    footer: {
        flex: 1,
    },
    footerContent: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius:BORDER_RADIUS,
        flexDirection: "row"
    },
})

const slides = [
    {title: "Relaxed", subtitle: "Relaxed.Sub", description: "Relaxed.Desc",  color: "#BFEAF5"},
    {title: "Playful", subtitle: "Playful.Sub", description: "Playful.Desc", color: "#BEECC5"},
    {title: "Exentric", subtitle: "Exentric.Sub", description: "Exentric.Desc", color: "#FFE4D9"},
    {title: "Funky", subtitle: "Funky.Sub", description: "Funky.Desc", color: "#FFDDDD"},
]

const Onboarding = () => {
    const scroll = useRef<Animated.ScrollView>();

    const x = useValue(0)
    const onScroll = onScrollEvent({x});
    // const backgroundColor = interpolateColor(x, {
    //     inputRange: slides.map((_, i) => i * width),
    //     outputRange: slides.map(slide => slide.color),
    // }) as any
    return( 
    <View style={styles.container}>
        <Animated.View style={[styles.slider, ]}>
            <Animated.ScrollView 
                //@ts-ignore
                ref={scroll}
                horizontal snapToInterval={width} 
                decelerationRate="fast" 
                showsHorizontalScrollIndicator={false}
                bounces={false}
                {...{onScroll}}
            >
                {slides.map(({title}, index) => (
                    <Slide key={index} {...{title}} right={!!(index % 2)}/>
                ))}

            </Animated.ScrollView >
        </Animated.View>
        <View style={styles.footer}>
            <Animated.View style={{...StyleSheet.absoluteFillObject,
                }}/>
            <Animated.View style={[styles.footerContent, 
                {width: width * slides.length, flex:1,
                transform: [{translateX: multiply(x, -1)}]}]}
            >
                {slides.map(({subtitle, description}, index) => (
                    <Subslide key={index} 
                        onPress={() => {
                            // console.log("xxx2")
                            if(scroll.current){
                                // console.log("yyyy");
                                // console.log(scroll.current.getNode());
                                //@ts-ignore
                                scroll.current.scrollTo({
                                    x:width * (index + 1), animated:true})
                            }
                        } }
                        last={index === (slides.length - 1)}
                        {...{subtitle, description}} 
                    />
                ))}
            </Animated.View>
        </View>
    </View>
    )
}

export default Onboarding;