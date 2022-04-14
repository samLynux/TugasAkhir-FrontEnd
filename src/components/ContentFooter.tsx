import  React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import Svg, { Path } from 'react-native-svg';

import theme  from './Theme';

const {width} = Dimensions.get("window")

const viewBox = {
    width: 375,
    height: 100
}
const height = (100 * width) / viewBox.width



const d = "M 0 0 H 375 A 50 50 0 0 1 325 50 H 50 A 0 50 0 0 0 0 100"
const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
        justifyContent:"flex-end"
    },
    image: {
        width,
        height: (width * 750)/1125,
    }
})
interface ContentFooterProp {
    children: React.ReactNode;
}


const ContentFooter = ({children}:ContentFooterProp) => {
    


  return (
    <>
    <View style={styles.background}>
        <Image 
            source={require("../../assets/patterns/1.png")}
            style={styles.image}
        />
        <Image 
            source={require("../../assets/patterns/2.png")}
            style={styles.image}
        />
        <Image 
            source={require("../../assets/patterns/3.png")}
            style={styles.image}
        />
    </View>
    
        {children}
    <Svg
        width={width}
        height={height}
        viewBox={
            [0,0, viewBox.width, viewBox.height].join(" ")
        }
    >
        <Path fill={theme.colors.white} d={d}/>
    </Svg>
    </>
  );
}

export default ContentFooter;