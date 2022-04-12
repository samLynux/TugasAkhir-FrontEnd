import { DrawerActions, useNavigation } from '@react-navigation/native';
import  React from 'react';

// import { Feather as Icon } from '@expo/vector-icons';
import { Dimensions, Image } from 'react-native';
import { Box, Header, Text, theme } from '../../components';
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
    screen: "FavouriteOutfits",
    color: "pink",
  },
  {
    icon: "mail",
    label: " TransactionHistory",
    screen: "TransactionHistory",
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
  const navigation = useNavigation();


  return (
    <>
      <Box flex={1}>
        <Box flex={0.2} backgroundColor="white">
            <Box position="absolute" 
                top={0} left={0} right={0} bottom={0} //@ts-ignore
                borderBottomRightRadius="xl"
                backgroundColor="light_green"
            >
              <Header
                dark
                title='Menu'
                left={{
                  icon:"x",
                   onPress: () => navigation.dispatch(DrawerActions.closeDrawer())
                }}
                right={{
                  icon:"shopping-bag",
                   onPress: () => true
                }}
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
              {items.map((item) => (//@ts-ignore
                <DrawerItem key={item.screen} {...item} />
              ))}
            </Box>
        </Box>
        <Box flex={0.2} backgroundColor="white"
            width={WIDTH_DRAWER} {...{height}}
            overflow="hidden"
        >
            <Image
                source={require("../../../assets/patterns/drawer.png")} 
                style={{
                    width: WIDTH_DRAWER, height, //@ts-ignore
                    borderTopLeftRadius: theme.borderRadii.xxl
                }}
                
            />
        </Box>
      </Box>
    </>
  );
}

export default DrawerContent;