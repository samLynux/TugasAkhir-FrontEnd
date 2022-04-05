import React from 'react';
import { View,  StyleSheet, Dimensions } from 'react-native';
import { Button, Text } from '../../components';

const {width} = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        padding:44, 
        width
    },
    subtitle: {
        marginBottom:12,
        textAlign:"center"
    },
    description: {
        color:"#0C0D34",
        textAlign:"center",
        marginBottom:40,
    },
    // titleContainer: {
    //     height:100,
    //     justifyContent: "center",
        
    // },
})


interface SlideProps{
    subtitle: string;
    description: string;
    last?: boolean,
    onPress: () => void;
}

const Subslide = ({subtitle,description, last, onPress}: SlideProps) => {
    
    return( 
    <View style={styles.container}>
        <Text variant={"title2"} style={styles.subtitle}>{subtitle}</Text>
        <Text variant={"body"} style={styles.description}>{description}</Text>
        <Button label={last ? "Let's get stated" : "Next"}
            variant={last ? "primary" : "default"}
            {...{onPress}}
        />
    </View>
    )
}

export default Subslide;