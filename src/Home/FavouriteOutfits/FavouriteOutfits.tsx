
import  React, { useRef, useState }  from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Transition, Transitioning } from 'react-native-reanimated';
import { Box, Header } from '../../components';

import { HomeNavigationProps } from '../../components/Navigation';
import Footer from './Footer';
import Outfit from './Outfit';
import TopCurve from './TopCurve';

const {width: wWidth} = Dimensions.get("window")
const defaultOutfits = [
    {
        id: 1,
        color: "#BFEAF5",
        aspectRatio: 1,
        selected: false
    },
    {
        id: 2,
        color: "#BEECC4",
        aspectRatio: 200/145,
        selected: false
    },
    {
        id: 3,
        color: "#FFE4D9",
        aspectRatio: 1,
        selected: false
    },
    {
        id: 4,
        color: "#D5C3BB",
        aspectRatio: 1,
        selected: false
    },
    {
        id: 5,
        color: "#BFEAF5",
        aspectRatio: 1,
        selected: false
    },
    {
        id: 6,
        color: "#BEECC4",
        aspectRatio: 120/145,
        selected: false
    },
    {
        id: 7,
        color: "#D5C3BB",
        aspectRatio: 210/145,
        selected: false
    },
    {
        id: 8,
        color: "#DEEFC4",
        aspectRatio: 160/145,
        selected: false
    },
]

const FavouriteOutfits = ({ navigation}: HomeNavigationProps<"FavouriteOutfits">) => {
    const transition = (
        <Transition.Together>
            <Transition.Out type='fade' />
            <Transition.In type='fade'  />
        </Transition.Together>
    )


    const width = (wWidth - 16 *3) /2;
    const [footerHeight, setFooterHeight] = useState(0)
    const [outfits, setOutfits] = useState(defaultOutfits)
    // const [selectedOutfits, setSelectedOutfits] = useState<typeof defaultOutfits>(
    //     []
    // )

    const list = useRef<typeof Transitioning.View>(null)
    
    
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
                    ref={list} {...{transition}}
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
                    label='add to fav'
                    onPress={() => { //@ts-ignore
                        list.current?.animateNextTransition();
                        setOutfits(outfits.filter(outfit =>
                            !outfit.selected    
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