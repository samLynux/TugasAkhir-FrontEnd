
import { useIsFocused } from '@react-navigation/native';
import  React, { useEffect, useRef, useState }  from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Transition, Transitioning } from 'react-native-reanimated';
import { Box, Header } from '../../components';

import { HomeNavigationProps } from '../../components/Navigation';
import Footer from './Footer';
import Outfit from './Outfit';
import TopCurve from './TopCurve';

const {width: wWidth} = Dimensions.get("window")

interface item{
    id: number;
    color: string;
    image: string,
    label: string,
    aspectRatio: number;
    price: number;
    sizes: string[];
    selected: boolean;
}

const defaultOutfits: item[] = [
    {
        id: 1,
        color: "#BFEAF5",
        image: "https://media.glamour.com/photos/6091783294d91bbf997a2f2b/master/w_1600,h_2148,c_limit/cute%20summer%20outfits.jpeg",
        label: "sad",
        aspectRatio: 1,
        price: 20000,
        sizes: ["l"],
        selected:false
    },
    {
        id: 2,
        color: "#BEECC4",
        image: "https://www.ubuy.co.id/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNjFSMVhpRnVPS0wuX0FDX1VMMTI1MF8uanBn.jpg",
        label: "new summer",
        aspectRatio: 1,
        price: 30000,
        sizes: ["s","m"],
        selected:false
    },
    {
        id: 3,
        color: "#FFE4D9",
        image: "https://image.made-in-china.com/155f0j00LMZajAtqfFhr/Hla-Fashion-Quick-Drying-Casual-Shorts-2020-Summer-New-Sports-Style-Comfortable-Shorts-Men.jpg",
        label: "sad",
        aspectRatio: 1,
        price: 20000,
        sizes: ["m","l","xl"],
        selected:false
    },
    {
        id: 4,
        color: "#D5C3BB",
        image: "https://i.ebayimg.com/images/g/TLEAAOSwi0RXxG5z/s-l300.jpg",
        label: "sad",
        aspectRatio: 1,
        price: 20000,
        sizes: ["s","m","l"],
        selected:false
    },
    {
        id: 5,
        color: "#BFEAF5",
        image: "https://static.thehoneycombers.com/wp-content/uploads/sites/2/2019/11/Uniqlo-winter-wear-in-singapore-900x643.jpg",
        label: "sad",
        aspectRatio: 1,
        price: 20000,
        sizes: ["s","m","l","xl"],
        selected:false
    },
    {
        id: 6,
        color: "#BEECC4",
        image: "https://www.ubuy.co.id/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvODFnRDdacUJkc0wuX0FDX1VMMTUwMF8uanBn.jpg",
        label: "sad",
        aspectRatio: 1,
        price: 20000,
        sizes: ["s","m","l"],
        selected:false
    },
    {
        id: 7,
        color: "#D5C3BB",
        image: "https://i.pinimg.com/originals/26/54/5c/26545c7791a06a2119a72bb06140023f.jpg",
        label: "sad",
        aspectRatio: 1,
        price: 20000,
        sizes: ["s","m","l","xl"],
        selected:false
    },
    {
        id: 8,
        color: "#DEEFC4",
        image: "https://m.media-amazon.com/images/I/71IU3kwVVsL._AC_UX385_.jpg",
        label: "sad",
        aspectRatio: 1,
        price: 20000,
        sizes: ["s","m","l","xl"],
        selected:false
    },
]

const FavouriteOutfits = ({ navigation}: HomeNavigationProps<"FavouriteOutfits">) => {
    const transition = (
        <Transition.Together>
            <Transition.Out type='fade' durationMs={500}/>
            <Transition.In type='fade'  />
        </Transition.Together>
    )
    const isFocused = useIsFocused()

    const width = (wWidth - 16 *3) /2;
    const [footerHeight, setFooterHeight] = useState(0)
    const [outfits, setOutfits] = useState(defaultOutfits)

    const list = useRef<typeof Transitioning.View>(null)
    
    

    useEffect(() => {
        
        setOutfits(defaultOutfits);
        console.log(outfits[0]);

    }, [isFocused])
    return (
        <>
        <Box flex={1} backgroundColor="white">
            <Header
                dark
                title='Favourite Outfits'
                left={{
                icon:"menu",
                    onPress: () => navigation.openDrawer()
                }}
                right={{
                icon:"shopping-bag",
                    onPress: () => navigation.navigate("Cart")
                }}
            />
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
                                    width={width}
                                />
                            ))}
                    </Box>
                    <Box>
                        
                        {outfits.filter((_, i) => i % 2 === 0).map((outfit) => 
                            <Outfit key={outfit.id} 
                                outfit={outfit}
                                width={width}
                                
                                
                            />
                        )}
                        
                    </Box>
                </Box>
                </Transitioning.View>
            </ScrollView>
            <TopCurve footerHeight={footerHeight}/>

            <Box position="absolute" 
                bottom={0} left={0} right={0}
                onLayout={({
                    nativeEvent: {
                        layout: {height}
                    },
                }) => setFooterHeight(height)}
            >
                <Footer
                    label='Remove'
                    onPress={() => { //@ts-ignore
                        list.current?.animateNextTransition();
                        setOutfits(outfits.filter(outfit =>
                            outfit.selected === false
                        ))
                    }}
                />
            </Box>
            </Box>
        </Box>
        </>
    )
}

export default FavouriteOutfits;