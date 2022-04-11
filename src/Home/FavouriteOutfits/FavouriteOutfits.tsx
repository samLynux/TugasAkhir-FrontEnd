
import  React, { useRef, useState }  from 'react';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Transition, Transitioning } from 'react-native-reanimated';
import { Box, Header } from '../../components';

import { HomeNavigationProps } from '../../components/Navigation';
import Footer from './Footer';
import Outfit from './Outfit';

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
        color: "#F3F0EF",
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
    const transition = <Transition.Change interpolation="easeInOut"/>
    const width = (wWidth - 16 *3) /2;
    const [footerHeight, setFooterHeight] = useState(0)
    const [outfits, setOutfits] = useState(defaultOutfits)
    // const [selectedOutfits, setSelectedOutfits] = useState<typeof defaultOutfits>(
    //     []
    // )

    const left = useRef<typeof Transitioning.View>(null)
    const right = useRef<typeof Transitioning.View>(null)
    
    return (
        <>
        <Box flex={1} backgroundColor="white">
            <Header
                dark
                title='Outfit Ideas'
                left={{
                icon:"menu",
                    onPress: () => navigation.openDrawer()
                }}
                right={{
                icon:"shopping-bag",
                    onPress: () => true
                }}
            />
            <Box flex={1}>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal:8,
                    paddingBottom: footerHeight
                }}
            >
                <Box flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box marginRight="m">
                        <Transitioning.View //@ts-ignore
                            ref={left} {...{transition}}
                        >
                        {outfits.filter((_, i) => i % 2 !== 0).map((outfit) => 
                            <Outfit key={outfit.id} 
                                outfit={outfit}
                                width={width}
                                
                                
                            />
                        )}
                        </Transitioning.View>
                    </Box>
                    <Box>
                        <Transitioning.View //@ts-ignore
                            ref={right} {...{transition}}
                        >
                        {outfits.filter((_, i) => i % 2 === 0).map((outfit) => 
                            <Outfit key={outfit.id} 
                                outfit={outfit}
                                width={width}
                                
                                
                            />
                        )}
                        </Transitioning.View>
                    </Box>
                </Box>
            </ScrollView>

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
                    onPress={() => {
                        // left?.current.animatNextTransito
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