import  React from 'react';

import { AntDesign as Icon } from '@expo/vector-icons';
import { Box, Text, Theme } from './Theme';

export interface RoundedIconProps {
    name: string;
    size:number;
    color:keyof Theme["colors"];
    backgroundColor: string;
}


const RoundedIcon = ({name, size, color,backgroundColor }: RoundedIconProps) => {
    


  return (
    <>
       <Box height={size} width={size} //@ts-ignore
            borderRadius="m"
            justifyContent="center" alignItems="center"
            {...{backgroundColor}}
        >
            <Text {...{color}}>
                <Icon //@ts-ignore
                    name={name} 
                    color="white" />
            </Text>
            
        </Box>
    </>
  );
}

export default RoundedIcon;