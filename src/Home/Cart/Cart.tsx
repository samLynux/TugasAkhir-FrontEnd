import  React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { Box,  Header,  theme , Text} from '../../components';

import { HomeNavigationProps } from '../../components/Navigation';
import { aspectRatio, width } from '../../components/Theme';
import { CartContext } from '../services/cart.context';
import CartContainer from './CartContainer';
import Item from './Item';


const height = width * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 0 Z"


// const defaultItems = [
//     {
//         id: 0,
//         size: "s",
//         name: "Short Sleeves Top",
//         price: "29.20"
//     },
//     {
//         id: 1,
//         size: "s",
//         name: "Short Sleeves Bottom",
//         price: "20.20"
//     },
//     {
//         id: 2,
//         size: "s",
//         name: "No Sleeves Top",
//         price: "9.20"
//     },
//     {
//         id: 3,
//         size: "s",
//         name: "No Sleeves Bottom",
//         price: "0"
//     },
// ]

const Cart = ({ navigation}: HomeNavigationProps<"Cart">) => {
    const [cart, setCart] = useContext(CartContext)
    const [total, setTotal] = useState(0)
   
    //@ts-ignore
   const addItem = (item, index)  => {
        if(item.quantity >= 9){
            alert("Reached Maximum Quantity")
            return
        }
        setCart(
            cart.map((item, i) => 
                i === index 
                ? {...item, quantity :( item.quantity + 1)} 
                : item 
        ))
    }
    //@ts-ignore
    const decreaseItem = (item, index)  => {
        if(item.quantity <= 1){
            alert("Swipe Left to remove product")
            return
        }
        setCart(
            cart.map((item, i) => 
                i === index 
                ? {...item, quantity :( item.quantity - 1)} 
                : item 
        ))
    }


   useEffect(() => {
        let newTotal = 0
        cart.forEach((item) => {
            newTotal += item.price * item.quantity
        });
        setTotal(newTotal)
    }, [cart]);
  return (
    <>
        <CartContainer total={total}>
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
                    style={{ backgroundColor:theme.colors.gray,
                        //@ts-ignore
                        borderBottomLeftRadius: theme.borderRadii.xl,//@ts-ignore
                        borderBottomRightRadius: theme.borderRadii.xl,
                        
                    }}
                    contentContainerStyle={{
                        
                        paddingVertical: 70 * aspectRatio
                    }}
                >
                    {cart.map((item, index) => (
                        <Item 
                            Product={item} 
                            key={item.id } 
                            onDelete={() => {
                                cart.splice(index, 1);
                                setCart(cart.concat());
                            }}
                            onPlus={() => {
                                addItem(item, index)
                                
                            }}
                            onMinus={() => {
                                decreaseItem(item, index)
                                
                            }}
                        />
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