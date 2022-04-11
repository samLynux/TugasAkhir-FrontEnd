import  React, { useState } from 'react';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, RoundedIcon } from '../../components';



interface OutfitProps {
    outfit: {
        id: number;
        color: string;
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
        alignItems="flex-end"
        padding="m"
        style={{
            backgroundColor: outfit.color,
            width, height: (width * outfit.aspectRatio)
        }}   
    >
        {selected && (
            <RoundedIcon
                name='check'
                backgroundColor='primary'
                color="white"
                size={24}
            />
        )}
      
      
    </Box>

    </BorderlessButton> 
    </>
  );
}

export default Outfit;