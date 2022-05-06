import  React  from 'react';
import { Image } from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, Text } from '.';



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
        borderWidth={1}
        borderColor="black"
        backgroundColor={outfit.primaryColor}
        style={{
            width, height: (width )
        }}   
    >
        
        <Image style={{
                width: width/1.5,
                height: (width / 1.5 )
            }}
            source={{uri:outfit.image}}/>
        
        <Box
            style={{
                backgroundColor: "black",
                width,
            }}   
            
            
        >
            <Text textAlign="center" 
                color= "white"
            >
                {outfit.title}
            </Text>
        </Box>
    </Box>

    </BorderlessButton> 
    </>
  );
}

export default Outfit;