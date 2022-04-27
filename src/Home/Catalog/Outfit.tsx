import  React  from 'react';
import { Image } from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, Text } from '../../components';



interface OutfitProps {
    outfit: {
        id: string;
        primaryColor: string;
        image: string;
        title: string;
        price: number;
        sizes?: string[];
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
            backgroundColor: outfit.primaryColor,
            width, height: (width )
        }}   
    >
        <Image style={{
                width: width/1.5,
                height: (width / 1.5 )
            }}
            source={{uri:outfit.image}}/>
      
        <Text>{outfit.title}</Text>
      
    </Box>

    </BorderlessButton> 
    </>
  );
}

export default Outfit;