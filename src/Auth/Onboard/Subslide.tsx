import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../components';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        padding:44,
    },
    subtitle: {
        fontSize: 24,
        lineHeight: 30,
        marginBottom:12,
        fontFamily: "SFProText-Semibold",
        color:"#0C0D34",
        textAlign:"center"
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: "SFProText-Regular",
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
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
        <Button label={last ? "Let's get stated" : "Next"}
            variant={last ? "primary" : "default"}
            {...{onPress}}
        />
    </View>
    )
}

export default Subslide;