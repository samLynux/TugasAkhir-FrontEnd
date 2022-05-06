import  React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Box, Text } from './Theme';


interface CategoryProps {
    category: {
        id: string;
        color: string;
        title: string;

    }[]
    optionsCount: number;
    onPress: (title: string) => void;
}


const Category = ({category, optionsCount, onPress}: CategoryProps) => {
    const [selected, setSelected] = useState(0)

    return (
        <>
        <Box 
            marginLeft="m" alignItems="center"
            marginTop="m"
        >
        <RectButton onPress={() => {
            if(selected < (optionsCount - 1)){
              onPress(category[selected + 1].id);
            }else{
              onPress(category[0].id);
            }
            setSelected((prev) => prev < (optionsCount - 1) ? prev + 1: 0)
            
        }}>
        
            <Box
                width={75} height={120}
                justifyContent="center"
                alignItems="center"
            >
            <View style={{
                width: 60, height: 60,
                borderRadius: 30,
                
                backgroundColor: category[0].color
            }}>
                
            {selected > 0 && (
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    borderWidth:1,
                    borderRadius: 60,
                    borderColor: "black"
                }}/>
            )}

            </View>
            <Text textAlign="center" marginTop="s">
                {category[selected].title}
            </Text>
            </Box>
       
        </RectButton>
        </Box>
        </>
    )
}

export default Category;