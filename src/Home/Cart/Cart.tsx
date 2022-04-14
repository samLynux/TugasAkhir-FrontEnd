import  React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { Box,  Header,  theme , Text} from '../../components';

import { HomeNavigationProps } from '../../components/Navigation';
import { aspectRatio, width } from '../../components/Theme';
import CartContainer from './CartContainer';
import Item from './Item';


const height = width * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 0 Z"

const Cart = ({ navigation}: HomeNavigationProps<"Cart">) => {
   
    
  return (
    <>
        <CartContainer>
            <Box backgroundColor="primary"paddingTop="m">

            
            <Header
                dark
                title='Cart'
                left={{
                icon:"arrow-left",
                    onPress: () => navigation.goBack()
                }}
            />
            </Box>
            <Box 
                style={{
                    position:"absolute",
                    bottom:height/2,
                    left:0,
                    right:0,
                    height,
                }}
            >
                <Svg
                    style={StyleSheet.absoluteFill}
                    // viewBox="0 0 375 100"
                >
                    <Path fill={theme.colors.primary} d={d}/>
                </Svg>
                <Text variant="title2"
                    textAlign="center"
                    color="white"
                >
                    3 Items Added
                </Text>
            </Box>
            <Box flex={1} >
                <ScrollView
                    style={{
                        //@ts-ignore
                        borderBottomLeftRadius: theme.borderRadii.xl,//@ts-ignore
                        borderBottomRightRadius: theme.borderRadii.xl
                    }}
                >
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                </ScrollView>
            </Box>
            
        </CartContainer>
    
    </>
  );
}

export default Cart;