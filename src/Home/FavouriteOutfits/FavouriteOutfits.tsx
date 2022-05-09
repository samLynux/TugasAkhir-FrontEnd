
import { CommonActions, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import  React, { useEffect, useRef, useState }  from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Transition, Transitioning } from 'react-native-reanimated';
import { Box, Button, Header, Text } from '../../components';

import { HomeNavigationProps } from '../../components/Navigation';
import Outfit from '../../components/Outfit';

const {width: wWidth} = Dimensions.get("window")

interface outfit {
    id: string;
    primaryColor: string;
    image: string;
    title: string;
    price: number;
    sizes?: string[];
}

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
    const [outfits, setOutfits] = useState<outfit[]>([])
    



    const list = useRef<typeof Transitioning.View>(null)
    
    

    useEffect(() => {
        
        axios.get("users/fav")
            .then((response) => {
                // console.log(response.data)
                setOutfits(response.data)
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
        
    }, [isFocused])
    return (
        <>
        <Box flex={1} backgroundColor="white">
            <Header
                dark
                title='Favourite Outfits'
                left={{
                icon:"menuunfold",
                    onPress: () => navigation.openDrawer()
                }}
                right={{
                icon:"shoppingcart",
                    onPress: () => navigation.navigate("Cart")
                }}
            />
            <Box flex={1} marginVertical="l">
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal:8,
                    paddingBottom: footerHeight
                }}
            >
                <Transitioning.View //@ts-ignore
                    ref={list} transition={transition}
                >
                
                <Box>
                    {outfits.length > 0 ? (
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
                            )}
                            
                        </Box>
                        </Box>  
                    ):(
                        <Box flex={1} justifyContent="center" alignItems="center">
                            <Text textAlign="center" padding="xl">
                                No Favourites Have been Added Yet
                            </Text>
                            <Button 
                                label='Go To Catalog'
                                onPress={() => navigation.navigate("Catalog")}
                            />
                        </Box>
                    )
                    }
                    
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
                {/* <Footer
                    label='Remove'
                    onPress={() => { //@ts-ignore
                        list.current?.animateNextTransition();
                        setOutfits(outfits.filter(outfit =>
                            outfit.selected === false
                        ))
                    }}
                /> */}
            </Box>
            </Box>
        </Box>
        </>
    )
}

export default FavouriteOutfits;