import React, {  useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { divide,  interpolateColors,  multiply } from 'react-native-reanimated';

import {useScrollHandler } from  "react-native-redash";
import Dot from './Dot';
import Slide, {SLIDE_HEIGHT, BORDER_RADIUS} from './Slide';
import Subslide from './Subslide';

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
        // flexDirection: "row"
    },
    pagination: {
        ...StyleSheet.absoluteFillObject,
        height:BORDER_RADIUS, 
        flexDirection:  'row',
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:"green", 
        // flex:1
    },
})

const slides = [
    {
        title: "Relaxed", 
        subtitle: "Relaxed.Sub", 
        description: "Relaxed.Desc",  
        color: "#BFEAF5",
        picture: require("../../../assets/1.png")
    },
    {
        title: "Playful", 
        subtitle: "Playful.Sub", 
        description: "Playful.Desc", 
        color: "#BEECC5",
        picture: require("../../../assets/2.png")
    },
    {
        title: "Exentric", 
        subtitle: "Exentric.Sub", 
        description: "Exentric.Desc", 
        color: "#FFE4D9",
        picture: require("../../../assets/3.png")
    },
    {
        title: "Funky", 
        subtitle: "Funky.Sub", 
        description: "Funky.Desc", 
        color: "#FFDDDD",
        picture: require("../../../assets/4.png")
    },
]

const Onboarding = () => {
    const scroll = useRef<Animated.ScrollView>();

    // const x = useValue(0)
    const {scrollHandler, x} = useScrollHandler();
    // const onScroll = onScrollEvent({x});
    const backgroundColor = interpolateColors(x, {
        inputRange: slides.map((_, i) => i * width),
        outputColorRange: slides.map(slide => slide.color),
    }) as any
    return( 
    <View style={styles.container}>
        <Animated.View style={[styles.slider,]}>
            <Animated.ScrollView 
                //@ts-ignore
                ref={scroll}
                horizontal snapToInterval={width} 
                decelerationRate="fast" 
                showsHorizontalScrollIndicator={false}
                bounces={false}
                {...scrollHandler}
            >
                {slides.map(({title, picture}, index) => (
                    <Slide key={index} 
                    {...{title, picture}} 
                    right={!!(index % 2)}/>
                ))}

            </Animated.ScrollView >
        </Animated.View>
        <View style={styles.footer}>
            <Animated.View style={{...StyleSheet.absoluteFillObject,
               backgroundColor:"red" }}/>
            <Animated.View style={styles.footerContent }>
                <View style={styles.pagination}>
                    {slides.map((_, index) => (
                        <Dot key={index} 
                            currentIndex={divide(x, width)} 
                            {...{index,x}}/>
                    ))}
                </View>
                <Animated.View style={{
                    flexDirection:"row",
                    width: width * slides.length, flex:1,
                    transform: [{translateX: multiply(x, -1)}]}}
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
            </Animated.View>
        </View>
    </View>
    )
}

export default Onboarding;