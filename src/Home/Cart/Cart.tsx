import  React, { useState } from 'react';
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


const defaultItems = [
    {
        id: 0,
        size: "s",
        name: "Short Sleeves Top",
        price: "29.20"
    },
    {
        id: 1,
        size: "s",
        name: "Short Sleeves Bottom",
        price: "20.20"
    },
    {
        id: 2,
        size: "s",
        name: "No Sleeves Top",
        price: "9.20"
    },
    {
        id: 3,
        size: "s",
        name: "No Sleeves Bottom",
        price: "0"
    },
]

const Cart = ({ navigation}: HomeNavigationProps<"Cart">) => {
   const [items, setItems] = useState(defaultItems);
    
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
            
            <Box flex={1} >
                <ScrollView
                    nestedScrollEnabled = {true}
                    style={{ backgroundColor:"white",
                        //@ts-ignore
                        borderBottomLeftRadius: theme.borderRadii.xl,//@ts-ignore
                        borderBottomRightRadius: theme.borderRadii.xl
                    }}
                    contentContainerStyle={{
                        
                        paddingVertical: 50 * aspectRatio
                    }}
                >
                    {items.map((item, index) => (
                        <Item Product={item} key={item.id} onDelete={() => {
                            items.splice(index, 1);
                            setItems(items.concat());

                            console.log(items)
                        }}/>
                    ))}
                </ScrollView>
                <Box 
                    style={{
                        position:"absolute",
                        top:0,
                        left:0,
                        right:0,
                        height: height/3,
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
            </Box>
            
        </CartContainer>
    
    </>
  );
}

export default Cart;