import  React from 'react';
import { Box, Text, theme  } from '../../components';
import SwipableRow from './SwipableRow';

interface ItemProps{
  onDelete: () => void;
  Product: {
      id: number,
      size: string,
      name: string,
      price: string,
  },
}

const Item = ({onDelete, Product}: ItemProps) => {
  //@ts-ignore 
  const height = 120 + theme.spacing.m * 2
    
  return (
    <>
    <SwipableRow height={height} onDelete={(onDelete)}>
       <Box padding="m" flexDirection="row" backgroundColor="white">
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
              <Text variant="header">Size {Product.size}</Text>
              <Text variant="title3" marginBottom="s" >{Product.name}</Text>
              <Text variant="title3" >${Product.price}</Text>
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