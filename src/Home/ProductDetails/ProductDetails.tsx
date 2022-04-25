
import  React, { useContext, useState } from 'react';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {  Box, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import RoundedCheckboxGroup from '../../components/RoundedCheckboxGroup';
import { aspectRatio, width } from '../../components/Theme';
import { CartContext } from '../services/cart.context';
import Footer from './Footer';

interface outfit {
    id: string;
    color: string;
    image: string;
    label: string;
    price: number;
    sizes: string[];
}




const ProductDetails = ({ navigation, route}: HomeNavigationProps<"ProductDetails">) => {
    
    
    //@ts-ignore
    const {outfit}: outfit = route.params

    const [cart, setCart] = useContext(CartContext)
    const [size, setSize] = useState(outfit.sizes[0])
    
    return (
        <>
        <Header
            dark
            title={outfit.label}
            left={{
            icon:"arrow-left",
                onPress: () => navigation.navigate("Catalog")
            }}
            right={{
            icon:"shopping-bag",
                onPress: () => navigation.navigate("Cart")
            }}
        />
        <ScrollView>
        <Box //@ts-ignore
            borderRadius="m"
            marginBottom="m"
            justifyContent="space-evenly"
            alignItems="center" 
            padding="m"
            style={{
                backgroundColor: outfit.color,
                width, height: (width * aspectRatio)
            }}   
        >
                <Image style={{
                    
                    width: width/1.5,
                    height: (width / 1.5 * aspectRatio)
                }}
                    source={{uri:outfit.image}}/>
        
            
        
        </Box>
        
        <Box marginLeft="m">
            <Text >
                {outfit.price}
            </Text>
            <Text variant="body">
                Size
            </Text>
            <RoundedCheckboxGroup
                options={outfit.sizes} 
                radio    
                onPress={(s) => {
                    setSize(s)
                    
                }}
            />
        </Box>
        </ScrollView>
        <Box position="absolute" 
            bottom={0} left={0} right={0}
            
        >
        <Footer
            onBuy={() => { 
                console.log('buy');
            }}
            onCart={() => { 
                let checker = false;
                

                cart.forEach((item, index) => {
                    if ( item.label === outfit.label && item.size === size){
                        setCart(
                            cart.map((it, i) => 
                                i === index 
                                ? {...it, quantity :( it.quantity + 1)} 
                                : it 
                        ))
                        checker = true;
                    }
                   
                });
                if(!checker){
                    setCart([...cart, {
                        id: outfit.label + "-" + size,
                        label:outfit.label,
                        price:outfit.price,
                        image:outfit.image,
                        quantity: 1,
                        size
                    }])
                }
                alert("added")
            }}
            onFav={() => { 
                console.log('fav');
            }}
        />
        </Box>
        </>
    )
}

export default ProductDetails;