import  React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Box, Text } from '../../components';

interface CategoryProps {
    category: {
        id: string;
        color: string;
        title: string;

    }
}


const Category = ({category: {color: backgroundColor,title}}: CategoryProps) => {
    const [selected, setSelected] = useState(false)
    return (
        <>
        <Box 
            marginLeft="m" alignItems="center"
            marginTop="m"
        >
        <RectButton onPress={() => setSelected((prev) => !prev)}>
        
            <Box
                width={75} height={120}
                justifyContent="center"
                alignItems="center"
            >
            <View style={{
                width: 60, height: 60,
                borderRadius: 30,
                
                backgroundColor
            }}>
                
            {selected && (
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    borderWidth:1,
                    borderRadius: 60,
                    borderColor: "black"
                }}/>
            )}

            </View>
            <Text textAlign="center" marginTop="s">
                {title}
            </Text>
            </Box>
       
        </RectButton>
        </Box>
        </>
    )
}

export default Category;