import  React from 'react';
import { Box, Text, theme  } from '../../components';
import SwipableRow from './SwipableRow';

interface ItemProps{
  onDelete: () => void;
}

const Item = ({onDelete}: ItemProps) => {
   
    
  return (
    <>
    <SwipableRow onDelete={(onDelete)}>
       <Box padding="m" flexDirection="row" >
           <Box 
                width={120}
                height={120} //@ts-ignore
                borderRadius="m"
                style={{
                    backgroundColor:"#BFEAF5",
                }}
           >
             
           </Box>
           <Box padding="s" flex={1} justifyContent="center">
              <Text variant="header">Size S M L</Text>
              <Text variant="title3" marginBottom="s" >Short Sleeve Organic Top</Text>
              <Text variant="title3" >$29.90</Text>
            </Box>
            <Box justifyContent="center">
              <Box 
                backgroundColor="black" //@ts-ignore
                borderRadius="l"  //@ts-ignore
                width={theme.borderRadii.m *2}//@ts-ignore
                height={theme.borderRadii.m *2}
                justifyContent="center" alignItems="center"
              >
                <Text variant="header" color="white">
                  x2
                </Text>
              </Box>
            </Box>
       </Box>
       </SwipableRow>
    </>
  );
}

export default Item;