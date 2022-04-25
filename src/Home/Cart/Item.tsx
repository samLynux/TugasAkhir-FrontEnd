import  React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Box, Text, theme  } from '../../components';
import SwipableRow from './SwipableRow';

interface ItemProps{
  onDelete: () => void;
  onPlus: () => void;
  onMinus: () => void;
  Product: {
      size: string,
      label: string,
      price: number,
      image: string,
      quantity: number,
      id: string
  },
}

const Item = ({onDelete, onPlus, onMinus, Product}: ItemProps) => {
  //@ts-ignore 
  const height = 120 + theme.spacing.m * 2
    
  return (
    <>
    <SwipableRow height={height} onDelete={(onDelete)} onMinus={onMinus} onPlus={onPlus}>
       <Box padding="m" flexDirection="row" backgroundColor="white">
           <Box 
                width={120}
                height={120} //@ts-ignore
                borderRadius="m"
                style={{
                    backgroundColor:"#BFEAF5",
                }}
           >
             <Image style={StyleSheet.absoluteFillObject}
                source={{uri:Product.image}}/>
           </Box>
           <Box padding="s" flex={1} justifyContent="center">
              <Text variant="header">Size {Product.size}</Text>
              <Text variant="title3" marginBottom="s" >{Product.label}</Text>
              <Text variant="title3" >${Product.price}</Text>
              <Text variant="title3" >{Product.id}</Text>
            </Box>
            <Box justifyContent="center">
              <Box 
                backgroundColor="black" //@ts-ignore
                borderRadius="l"  //@ts-ignore
                width={theme.borderRadii.m *2}//@ts-ignore
                height={theme.borderRadii.m *2}
                justifyContent="center" alignItems="center"
              >
                <Text variant="header" color="white" >
                  x {Product.quantity}
                </Text>
              </Box>
            </Box>
       </Box>
       </SwipableRow>
    </>
  );
}

export default Item;