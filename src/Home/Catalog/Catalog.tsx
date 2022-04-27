
import axios from 'axios';
import  React, { useEffect, useRef, useState }  from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Transition, Transitioning } from 'react-native-reanimated';
import { Box, Header } from '../../components';
import Categories from '../../components/Categories';

import { HomeNavigationProps } from '../../components/Navigation';
import Outfit from './Outfit';

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

    const filtering = (tags: string[]) => {
        console.log(tags);
        // setOutfits([])
    }

    

    const width = (wWidth - 16 *3) /2;
    const [footerHeight, setFooterHeight] = useState(0) 
    const [outfits, setOutfits] = useState<outfit[]>([])

    

    const list = useRef<typeof Transitioning.View>(null)

    useEffect(() => {
        // console.log("xxxxxxxxxxxxxxxxxxx");
        
        axios.get("products")
            .then((e) => {
                // console.log(e.data.data);
                setOutfits(e.data.data)
            })
        
            
        
    }, [])
    
    
    return (
        <>
        <Box flex={1} backgroundColor="white">
            <Header
                dark
                title='Outfits Catalog'
                left={{
                icon:"menu",
                    onPress: () => navigation.openDrawer()
                }}
                right={{
                icon:"shopping-bag",
                    onPress: () => navigation.navigate("Cart")
                }}
            />
            <Categories onPress={(tags) => {
                filtering(tags);
                
            }}/> 
            <Box flex={1}>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal:8,
                    paddingBottom: footerHeight
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
                                    outfit={outfit}
                                    onPress={()=>{
                                        //@ts-ignore
                                        navigation.navigate("ProductDetails",{outfit:outfit})
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
                                    navigation.navigate("ProductDetails",{outfit:outfit})
                                }}
                                outfit={outfit}
                                width={width}
                                
                                
                            />
                        )}
                        
                    </Box>
                </Box>
                </Transitioning.View>
            </ScrollView>
           

            <Box position="absolute" 
                bottom={0} left={0} right={0}
                onLayout={({
                    nativeEvent: {
                        layout: {height}
                    },
                }) => setFooterHeight(height)}
            >
                
            </Box>
            </Box>
        </Box>
        </>
    )
}

export default Catalog;