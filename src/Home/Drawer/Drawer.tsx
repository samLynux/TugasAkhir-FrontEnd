import { CommonActions, DrawerActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import  React, { useContext } from 'react';
import { Dimensions, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Box, Header, Text, theme } from '../../components';
import { UserContext } from '../services/user.context';
import DrawerItem from './DrawerItem';


const {width} = Dimensions.get("window")
export const WIDTH_DRAWER = width * 0.8;
const aspectRatio = 750/ 1125;
const height = WIDTH_DRAWER * aspectRatio

const items = [
  {
    icon: "heart",
    label: "Outfit Catalog",
    screen: "Catalog",
    color: "light_blue",
  },
  {
    icon: "heart",
    label: "Favourite Outfit",
    screen: "FavouriteOutfits",
    color: "pink",
  },
  {
    icon: "user",
    label: "Edit Profile",
    screen: "EditProfile",
    color: "leaf_green",
  },
  {
    icon: "mail",
    label: " TransactionHistory",
    screen: "TransactionHistory",
    color: "light_green",
  },
  {
    icon: "settings",
    label: "Notification Settings",
    screen: "Settings",
    color: "black",
  },
  {
    icon: "log-out",
    label: "Logout", //@ts-ignore
    onPress: (navigation) => {
      axios.post("logout")
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [
          {name: "Authentication"},
        ]
      }))
      
    },
    color: "black",
  },
]

const DrawerContent = () => {
  const navigation = useNavigation(); //@ts-ignore
  const [[user], [userUpdater, setUserUpdater ]] = useContext(UserContext)

  
  // console.log(user);
  
  return (
    <>
      <Box flex={1}>
        <Box flex={0.2} backgroundColor="white">
            <Box position="absolute" 
                top={0} left={0} right={0} bottom={0} //@ts-ignore
                borderBottomRightRadius="xl"
                backgroundColor="light_blue"
            >
              <Header
                dark
                title='Menu'
                left={{
                  icon:"x",
                   onPress: () => navigation.dispatch(DrawerActions.closeDrawer())
                }}
                right={{
                  icon:"shopping-bag", //@ts-ignore
                   onPress: () =>  navigation.navigate("Cart")
                }}
              />
            </Box>
        </Box>
        <Box flex={0.8} >
            <Box flex={1} backgroundColor="light_blue"/>
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
                  {(user && user.firstname && user.lastname) ?
                      (user.firstname +" " + user.lastname ):
                      "Me"
                  }
                </Text>
                <Text variant="body" textAlign='center'>
                  
                  {user && user.email}
                </Text>
              </Box>
              <Box>
                <ScrollView
                  
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                      paddingBottom: height/2
                  }}
                >
                {items.map((item) => (//@ts-ignore
                  <DrawerItem key={item.label} {...item} />
                ))}
                </ScrollView>
              </Box>
            </Box>
        </Box>
        <Box flex={0.2} backgroundColor="white"
            width={WIDTH_DRAWER} height={height}
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