
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import  React, { useContext, useState, useEffect } from 'react';
import { Alert, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {  Box, Header, Text } from '../../components';
import LineItem from '../../components/LineItem';
import { HomeNavigationProps } from '../../components/Navigation';
import RoundedCheckboxGroup from '../../components/RoundedCheckboxGroup';
import { aspectRatio, width } from '../../components/Theme';
import { CartContext } from '../services/cart.context';
import Footer from './Footer';

interface outfit {
    id: string;
    image: string;
    title: string;
    description: string;
    price: number;
    sizes: {
        id: number
        value: string
    };
    primaryColor: {
        id: number
        value: string
    };
    secondaryColor: {
        id: number
        value: string
    };
    createdAt: string;
    gender: string;
    brand: {
        id: number
        value: string
    };
}



const ProductDetails = ({ navigation, route}: HomeNavigationProps<"ProductDetails">) => {
    
    
    //@ts-ignore
    const {outfit}: outfit = route.params

    const [cart, setCart] = useContext(CartContext)
    const [size, setSize] = useState<string>('')
    const [isFav, setIsFav] = useState(false)
    const  sizes = outfit.sizes //@ts-ignore
        .sort((a, b)=> a.id > b.id ? 1 : -1) 
        .map((s: { value:string})  => s.value)

    useEffect(() => {
        setSize('');
        axios.get(`users/favCheck?id=${outfit.id}`)
        .then((res) => {
            
            setIsFav(res.data)
        }).catch((err) => {
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
        
    }, [outfit])

    

    const addToCart = () => {
        if(size === ''){
            Alert.alert("Pick a Size!",
                "Please select a size from the available options or go back to catalog",
                [
                {text: 'Back'},
                ],
                {cancelable: false}
            )
            return false;
        }
        let checker = false;
        cart.forEach((item, index) => {
            if ( item.label === (outfit.title +"-"+ size)){
                setCart(
                    cart.map((it, i) => 
                        i === index 
                        ? {...it, quantity :( it.quantity < 9 ? it.quantity + 1 : it.quantity)} 
                        : it 
                ))
                checker = true;
            }
        });
        if(!checker){
            setCart([...cart, {
                id: outfit.id,
                label:outfit.title + "-" + size,
                price:outfit.price,
                image:outfit.image,
                quantity: 1,
                size
            }])
        }
        return true;
    }

    const addToFav = () => {
        axios.post(`users/favourited?id=${outfit.id}`)
        .then((res) => {
            const favourited = res.data
            setIsFav(favourited)
            // if(favourited){
            //     // alert("Added to Favourites")
            //     Alert.alert("Favourites", "Added To Favourites")
            // }else{
            //     Alert.alert("Favourites", "Removed From Favourites")
            // }
            
            
        }).catch((err) => {
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


    return (
        <>
        <Header
            dark
            title={outfit.title}
            left={{
            icon:"caretleft",
                onPress: () => navigation.navigate("Catalog")
            }}
            right={{
            icon:"shoppingcart",
                onPress: () => navigation.navigate("Cart")
            }}
        />
        <Box marginTop="l" backgroundColor="grey">
        <ScrollView 
            style={{
                marginBottom:150,
            }}
        >
        <Box //@ts-ignore
            borderRadius="m"
            marginBottom="m"
            justifyContent="space-evenly"
            alignItems="center" 
            padding="m"
            backgroundColor={outfit.primaryColor.value}
            style={{
                width,
            }}   
        >
                <Image style={{
                    
                    width: width/1.5,
                    height: (width / 1.5 * aspectRatio)
                }}
                    source={{uri:outfit.image}}/>
        
            
        
        </Box>
        
        <Box marginLeft="m">
            <LineItem 
                label='Description:'
                value={outfit.description}
            />
            <LineItem 
                label='Price:'
                value={'$' + outfit.price}
            />
            <Text variant="body" color="white">
                Sizes
            </Text>
            <Box alignItems="center">
                {sizes.length > 0 && (
                    <RoundedCheckboxGroup
                        defaults={[size]}
                        options={sizes} 
                        radio    
                        onPress={(s) => {
                            setSize(s)
                            
                        }}
                    />
                )}
                
            </Box>
            <LineItem 
                label='Brand:'
                value={outfit.brand.value.toUpperCase()}
            />
            <LineItem 
                label='Released At:'
                value={moment( outfit.created_at).format("DD MMM, YYYY")}
            />
            
        </Box>
        </ScrollView>
        </Box>
        <Box position="absolute" 
            bottom={0} left={0} right={0}
            
        >
        <Footer
            favIcon={isFav ? "heart" : "hearto"}
            onBuy={() => { 
                if(addToCart()) navigation.navigate("Cart")
            }}
            onCart={() => { 
                if(addToCart()) {
                    Alert.alert("Item Added!",
                    "This Product has been Added to Cart",
                    [
                    {text: 'Go To Cart', onPress: () => navigation.navigate("Cart")},
                    {text: 'Back'},
                    ],
                    {cancelable: false}
            )
                }
            }}
            onFav={() => { 
                addToFav();
            }}
        />
        </Box>
        </>
    )
}

export default ProductDetails;