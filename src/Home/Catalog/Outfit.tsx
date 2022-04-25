import  React  from 'react';
import { Image } from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, Text } from '../../components';



interface OutfitProps {
    outfit: {
        id: number;
        color: string;
        image: string;
        label: string;
        aspectRatio: number;
    }
    width: number
    onPress: () => void
}


const Outfit = ({outfit, width, onPress}: OutfitProps) => {
    

    // console.log(outfit.image);
    
  return (
      <>
    <BorderlessButton
        onPress={() => onPress()}
    >
        
    <Box //@ts-ignore
        borderRadius="m"
        marginBottom="m"
        justifyContent="space-evenly"
        alignItems="center" 
        padding="m"
        style={{
            backgroundColor: outfit.color,
            width, height: (width * outfit.aspectRatio)
        }}   
    >
            <Image style={{
                
                width: width/1.5,
                height: (width / 1.5 * outfit.aspectRatio)
            }}
                source={{uri:outfit.image}}/>
      
        <Text>{outfit.label}</Text>
      
    </Box>

    </BorderlessButton> 
    </>
  );
}

export default Outfit;