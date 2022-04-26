import  React, { useState } from 'react';
import { Image } from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, RoundedIcon, Text } from '../../components';



interface OutfitProps {
    outfit: {
        id: number;
        color: string;
        label:string;
        image: string;
        aspectRatio: number;
        selected: boolean;
    }
    width: number
}


const Outfit = ({outfit, width}: OutfitProps) => {
    const [selected, setSelected] = useState(false)
  return (
      <>
    <BorderlessButton
        onPress={() =>{
            setSelected((prev) => !prev);
            outfit.selected = !outfit.selected;
        }}
    >
        
    <Box //@ts-ignore
        borderRadius="m"
        marginBottom="m"
        padding="m"
        style={{
            backgroundColor: outfit.color,
            width, height: (width * outfit.aspectRatio)
        }}   
    >
        {selected && (
            <Box alignItems="flex-end" position="absolute">
                <RoundedIcon
                    name='check'
                    backgroundColor='primary'
                    color="white"
                    size={24}
                />
            </Box>
        )}
        <Box alignItems="center">
        <Image style={{
                width: width/1.5,
                height: (width / 1.5 * outfit.aspectRatio)
            }}
            source={{uri:outfit.image}}
        />
      
        <Text>{outfit.label}</Text>
        
      </Box>
      
      
    </Box>

    </BorderlessButton> 
    </>
  );
}

export default Outfit;