import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import  React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import { Box,  Header,  theme , Text} from '../../components';

import { HomeNavigationProps } from '../../components/Navigation';
import { aspectRatio, width } from '../../components/Theme';
import { CartContext } from '../services/cart.context';
import { UserContext } from '../services/user.context';
import CartContainer from './CartContainer';
import Item from './Item';


const height = width * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 0 Z"




const Cart = ({ navigation}: HomeNavigationProps<"Cart">) => {
    const [cart, setCart] = useContext(CartContext)
    const [total, setTotal] = useState(0)

    // @ts-ignore
    const [[user], [setUserUpdater]] = useContext(UserContext);
   
    const checkout = async () => {
        if(cart.length <= 0){
            Alert.alert("There is Nothing in the Cart!",
                "Please select something from the store before going to cart",
                [
                {text: 'OK'},
                ],
                {cancelable: false}
            )
            navigation.navigate("Catalog")
            return
        }
        if(!user.address){
            Alert.alert("Please Input Your Address!",
                "Please change your address by going to the edit profile page",
                [
                {text: 'Edit Profile', onPress: () => navigation.navigate("EditProfile")},
                {text: 'Back'},
                ],
                {cancelable: false}
            )
            
            return
        }
        const order_items = cart.map(order => ({
            product_id: order.id,
            product_title: order.label,
            price: order.price,
            quantity: order.quantity
        }))
        

        axios.post("orders",{
            total: total + 12,
            order_items: order_items
        })
            .then(() => {
                Alert.alert("Transaction Complete!",
                    "Your transaction was a success",
                    [
                    {text: 'See Transaction History', 
                        onPress: () => navigation.navigate("TransactionHistory")
                    },
                    {text: 'Continue Shopping', 
                        onPress: () => navigation.navigate("Catalog")
                    },
                    ],
                    {cancelable: false}
                )
                setCart([])
            }).catch(err => {
                // console.log(err);
                if(err.response.data.statusCode === 403){
                    alert("You are not logged in/ Your Login has Timed Out")
                    navigation.dispatch(CommonActions.reset({
                        index: 0,
                        routes: [
                        {name: "Authentication"},
                        ]
                    }))
                }
                
                
            })
        
    }
    //@ts-ignore
   const addItem = (item, index)  => {
        if(item.quantity >= 9){
            Alert.alert("Reached Maximum Quantity!",
                "The Maximum Number of Purchase is 9/product",
                [
                {text: 'OK'},
                ],
                {cancelable: false}
            )
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
            Alert.alert("Do you want to remove this product?",
                "Swipe Left to remove product",
                [
                {text: 'OK'},
                ],
                {cancelable: false}
            )
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
        <CartContainer total={total} onCheckout={checkout} 
            onChangeAddress={()=>{
                navigation.navigate("EditProfile")
            }}
        >
            <Box backgroundColor="primary"paddingTop="m">

            
            <Header
                dark
                title='Cart'
                left={{
                icon:"caretleft",
                    onPress: () => navigation.goBack()
                }}
            />
            </Box>
            
            <Box flex={1} >
                <ScrollView
                    nestedScrollEnabled = {true}
                    style={{ backgroundColor:theme.colors.white,
                        
                    }}
                    contentContainerStyle={{
                        
                        paddingVertical: 70 * aspectRatio
                    }}
                >
                    {cart.map((item, index) => (
                        <Item 
                            Product={item} 
                            key={item.label } 
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
                        {cart.length} Items Added
                    </Text>
                </Box>
            </Box>
            
        </CartContainer>
    
    </>
  );
}

export default Cart;