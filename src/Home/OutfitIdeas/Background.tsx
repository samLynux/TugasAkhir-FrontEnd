import  React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { Box } from '../../components';

const Background = () => {
    

  return (
    <>
    <View
        style={StyleSheet.absoluteFill}
    >
        <Box flex={1/3} backgroundColor="light_blue">
            <Box flex={1} backgroundColor="white" //@ts-ignore
                borderBottomRightRadius="xl"/>
        </Box>
        <Box flex={1/3} >
            <Box flex={1} backgroundColor="white"/>
            <Box flex={1} backgroundColor="dark_blue"/>
            <Image 
                source={require("../../../assets/patterns/background.png")}
                style={{
                    ...StyleSheet.absoluteFillObject,
                    width: undefined,
                    height: undefined,
                    resizeMode: "stretch",
                    borderTopLeftRadius:40,
                    borderBottomRightRadius: 40
                }}
            />
        </Box>
        <Box flex={1/3} backgroundColor="light_blue">
            <Box flex={1} backgroundColor="dark_blue"//@ts-ignore
                borderTopLeftRadius="xl"/>
        </Box>
        
    </View>
    </>
  );
}


export default Background;