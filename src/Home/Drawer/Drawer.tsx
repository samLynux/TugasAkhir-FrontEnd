import  React from 'react';

// import { Feather as Icon } from '@expo/vector-icons';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Text } from '../../components';
import RoundedIconButton from '../../components/RoundedIconButton';
import DrawerItem from './DrawerItem';


const {width} = Dimensions.get("window")
export const WIDTH_DRAWER = width * 0.8;
const aspectRatio = 750/ 1125;
const height = WIDTH_DRAWER * aspectRatio

const items = [
  {
    icon: "zap",
    label: "Outfit Ideas",
    screen: "OutfitIdeas",
    color: "black",
  },
  {
    icon: "heart",
    label: "Fav Outfit",
    screen: "Fav Outfit",
    color: "pink",
  },
  {
    icon: "mail",
    label: " Ideas",
    screen: "Ideas",
    color: "light_green",
  },
  {
    icon: "lock",
    label: "Outfs",
    screen: "Outfs",
    color: "black",
  },
  {
    icon: "check",
    label: "kalss",
    screen: "kalss",
    color: "black",
  },
  {
    icon: "x",
    label: " Ideas",
    screen: "Ideas2fd",
    color: "black",
  },
]

const DrawerContent = () => {
  const insets = useSafeAreaInsets();


  return (
    <>
      <Box flex={1}>
        <Box flex={0.2} backgroundColor="white">
            <Box position="absolute" 
                top={0} left={0} right={0} bottom={0} //@ts-ignore
                borderBottomRightRadius="xl"
                backgroundColor="light_green"
                flexDirection="row"
                justifyContent="space-between"
                paddingHorizontal="m"
                style={{paddingTop: insets.top}}
            >
              <RoundedIconButton 
                name='x' 
                color="black"
                backgroundColor='black'
                onPress={() => true}
                size={24}
              />
              <Text color="white">My Profile</Text>
              <RoundedIconButton 
                name='shopping-bag' 
                color="black"
                backgroundColor='black'
                onPress={() => true}
                size={24}
              />
            </Box>
        </Box>
        <Box flex={0.8} >
            <Box flex={1} backgroundColor="light_green"/>
            <Box flex={1} backgroundColor="pink"/>
            <Box position="absolute" 
                top={0} left={0} right={0} bottom={0} //@ts-ignore
                borderTopLeftRadius="xl" borderBottomRightRadius="xl"
                backgroundColor="white" padding="xl"
                justifyContent="center" 
            >
              <Box 
                alignSelf="center"
                width={100} height={100}
                backgroundColor="black" //@ts-ignore
                borderRadius="xxl" 
              />
              <Box marginVertical="m">
                <Text variant="title1" textAlign='center'>
                  Me
                </Text>
                <Text variant="body" textAlign='center'>
                  my@email.xxx
                </Text>
              </Box>
              {items.map((item) => (
                <DrawerItem key={item.screen} {...item} />
              ))}
            </Box>
        </Box>
        <Box flex={0.2} backgroundColor="white"
            width={WIDTH_DRAWER} {...{height}}
        >
            <Image
                source={require("../../../assets/patterns/1.png")} 
                style={{
                    ...StyleSheet.absoluteFillObject,
                    width: undefined, height: undefined
                }}
                
            />
        </Box>
      </Box>
    </>
  );
}

export default DrawerContent;