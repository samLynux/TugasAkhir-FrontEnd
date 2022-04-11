import  React, { useState } from 'react';
import {  sub } from 'react-native-reanimated';
import { useTransition } from 'react-native-redash';


import { Box, Header } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import Background from './Background';
import Card from './Card';
import Categories from './Categories';


const cards = [
  {
    index: 3,
    source: require("../../../assets/4.png")
  },
  {
    index: 2,
    source: require("../../../assets/3.png")
  },
  {
    index: 1,
    source: require("../../../assets/2.png")
  },
  {
    index: 0,
    source: require("../../../assets/1.png")
  },
]
const step = 1 /(cards.length -1)

const OutfitIdeas = ({ navigation}: HomeNavigationProps<"OutfitIdeas">) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const aIndex = useTransition(currentIndex)

  
  return (
    <>
    <Box position="absolute" 
        top={0} left={0} right={0} bottom={0} 
    >
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
      <Categories/>
      <Box flex={1}>
        <Background/>
        
        {
          cards.map(({index, source}) => 
            currentIndex < index * step + step && (
            <Card key={index} position={sub(
              index * step, aIndex
            )}
              {...{source, step}}
              onSwipe={() => setCurrentIndex((prev) => prev + step)}
            />
          ))
        }
        {/* <Card position={1}/>
        <Card position={0.5}/>
        <Card position={0}/> */}
      </Box>
    </Box>
    </>
  );
}

export default OutfitIdeas;