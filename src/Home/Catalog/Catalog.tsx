
import { CommonActions, useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import  React, { useEffect, useRef, useState }  from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Transition, Transitioning } from 'react-native-reanimated';
import SimpleToast from 'react-native-simple-toast';
import { Box, Button, Header } from '../../components';
import Categories from '../../components/Categories';

import { HomeNavigationProps } from '../../components/Navigation';
import Outfit from '../../components/Outfit';

const {width: wWidth} = Dimensions.get("window")

// const defaultOutfits = [
//     {
//         id: 1,
//         color: "#BFEAF5",
//         image: "https://media.glamour.com/photos/6091783294d91bbf997a2f2b/master/w_1600,h_2148,c_limit/cute%20summer%20outfits.jpeg",
//         label: "sad",
//         price: 20000,
//         sizes: ["l"]
//     },
//     {
//         id: 2,
//         color: "#BEECC4",
//         image: "https://www.ubuy.co.id/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNjFSMVhpRnVPS0wuX0FDX1VMMTI1MF8uanBn.jpg",
//         label: "new summer",
//         price: 30000,
//         sizes: ["s","m"]
//     },
//     {
//         id: 3,
//         color: "#FFE4D9",
//         image: "https://image.made-in-china.com/155f0j00LMZajAtqfFhr/Hla-Fashion-Quick-Drying-Casual-Shorts-2020-Summer-New-Sports-Style-Comfortable-Shorts-Men.jpg",
//         label: "sad",
//         price: 20000,
//         sizes: ["m","l","xl"]
//     },
//     {
//         id: 4,
//         color: "#D5C3BB",
//         image: "https://i.ebayimg.com/images/g/TLEAAOSwi0RXxG5z/s-l300.jpg",
//         label: "sad",
//         price: 20000,
//         sizes: ["s","m","l"]
//     },
//     {
//         id: 5,
//         color: "#BFEAF5",
//         image: "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2019/11/Uniqlo-winter-wear-in-singapore-900x643.jpg",
//         label: "sad",
//         price: 20000,
//         sizes: ["s","m","l","xl"]
//     },
//     {
//         id: 6,
//         color: "#BEECC4",
//         image: "https://www.ubuy.co.id/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvODFnRDdacUJkc0wuX0FDX1VMMTUwMF8uanBn.jpg",
//         label: "sad",
//         price: 20000,
//         sizes: ["s","m","l"]
//     },
//     {
//         id: 7,
//         color: "#D5C3BB",
//         image: "https://i.pinimg.com/originals/26/54/5c/26545c7791a06a2119a72bb06140023f.jpg",
//         label: "sad",
//         price: 20000,
//         sizes: ["s","m","l","xl"]
//     },
//     {
//         id: 8,
//         color: "#DEEFC4",
//         image: "https://m.media-amazon.com/images/I/71IU3kwVVsL._AC_UX385_.jpg",
//         label: "sad",
//         price: 20000,
//         sizes: ["s","m","l","xl"]
//     },
// ]

interface outfit {
    id: string;
    primaryColor: string;
    image: string;
    title: string;
    price: number;
    sizes?: string[];
}

const Catalog = ({ navigation}: HomeNavigationProps<"Catalog">) => {
    const transition = (
        <Transition.Together>
            <Transition.Out type='fade' durationMs={500}/>
            <Transition.In type='fade'  />
        </Transition.Together>
    )
    const [recommend, setRecommend] = useState<boolean>(false)
    const filtering = (brands: string[], cats: string[], gender: string) => {
        
        if(brands.length <= 0 && cats.length <= 0 && gender === "n"){
            SimpleToast.show("Loading All Products...",30)
            axios.get(`products?page=${page}`)
            .then((response) => {
                setOutfits(response.data.data)
                setShowAll(true);
                
            })
            return;
        }
        SimpleToast.show("Loading Products...",30)
        axios.post("products/filtered",{
            categories: cats.length > 0 ? [...cats] : null,
            brands: brands.length > 0 ? [...brands] : null,
            gender: gender !== "n" ? gender : null,
        })
        .then((response) => {
            setOutfits(response.data.data)
            setShowAll(false);
        })
    }

    const recommendUser = (rec: boolean) => {
        
        if(rec){
            SimpleToast.show("Loading Products...",30)
            axios.get("users/foruser")
                .then((response) => {
                    setOutfits(response.data)
                    setShowAll(false);
                    
            }).catch(err => {
                
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
            return
        }
        SimpleToast.show("Loading All Products...",30)
        axios.get(`products?page=${page}`)
            .then((response) => {
                setOutfits(response.data.data)
                setShowAll(true);
                
            })
        
    }

    const width = (wWidth - 16 *3) /2;
    
    const [outfits, setOutfits] = useState<outfit[]>([])
    const [showAll, setShowAll] = useState(true)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    const scroll = useRef<ScrollView>(null);

    const isFocused = useIsFocused()

    const list = useRef<typeof Transitioning.View>(null)

    useEffect(() => {
        
        axios.get("users/foruser")
            .then((response) => {
                if(response.data && response.data.length > 0) {
                    setRecommend(true)
                }
                else setRecommend(false)
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
    }, [isFocused])

    useEffect(() => {
        SimpleToast.show("Loading All Products...",30)
        axios.get(`products?page=${page}`)
            .then((response) => {
                // console.log(response.data.meta);
                
                setOutfits(response.data.data)
                setLastPage(response.data.meta.lastpage);
                setShowAll(true);
                
            })
        
    }, [page])
    
    
    return (
        <>
        <Box flex={1} backgroundColor="white">
            <Header
                dark
                title='Outfits Catalog'
                left={{
                icon:"menuunfold",
                    onPress: () => navigation.openDrawer()
                }}
                right={{
                icon:"shoppingcart",
                    onPress: () => navigation.navigate("Cart")
                }}
            />
            <Categories 
                onPress={(brand, cats, gender) => {
                    filtering(brand, cats, gender);    
                }}
                onRecommend={(active) => {
                    if(active){
                        recommendUser(true);
                    }else{
                        recommendUser(false);
                    }
                }}
                recommend={recommend}
            /> 
            <Box flex={1}>
            <ScrollView
                ref={scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal:8,
                    
                }}
            >
                <Transitioning.View //@ts-ignore
                    ref={list} transition={transition}
                >
                <Box flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box marginRight="m">
                        
                            {outfits.
                                filter((_, i) => i % 2 !== 0).map((outfit) => (
                                <Outfit key={outfit.id} 
                                    outfit={{
                                        ...outfit, //@ts-ignore
                                        primaryColor:outfit.primaryColor.value
                                    }}
                                    onPress={()=>{
                                        //@ts-ignore
                                        navigation.navigate("ProductDetails",{outfit})
                                    }}
                                    width={width}
                                />
                            ))}
                    </Box>
                    <Box>
                        
                        {outfits.filter((_, i) => i % 2 === 0).map((outfit) => 
                            <Outfit key={outfit.id} 
                                onPress={()=>{
                                            //@ts-ignore
                                            navigation.navigate("ProductDetails",{outfit})
                                }}
                                outfit={{
                                    ...outfit, //@ts-ignore
                                    primaryColor:outfit.primaryColor.value
                                }}
                                width={width}
                                
                                
                            />
                        )}
                        
                    </Box>
                </Box>
                </Transitioning.View>
                {showAll && (
                    <Box 
                        paddingBottom="l"
                        flexDirection="row"
                        alignItems="stretch"
                        justifyContent="space-evenly"
                    >
                        {page > 1 && (
                            <Button
                                style={{
                                    width: width,
                                    borderRadius:0,
                                }}
                                variant="primary"
                                label='<Previous Page'
                                onPress={() =>{
                                    setPage(page - 1)
                                    scroll.current?.scrollTo({
                                        y: 0,
                                    });
                                }}
                            />
                        )}
                        {page < lastPage && (
                            <Button
                                style={{
                                    width: width,
                                    borderRadius:0,
                                }}
                                variant="primary"
                                label='Next Page>'
                                onPress={() =>{
                                    setPage(page + 1)
                                    scroll.current?.scrollTo({
                                        y: 0,
                                    });
                                }}
                            />
                        )}
                        
                    </Box>
                )}
                
            </ScrollView>
           

            
            </Box>
        </Box>
        </>
    )
}

export default Catalog;