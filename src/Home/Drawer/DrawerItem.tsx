import  React from 'react';


import { Theme , Box} from '../../components/Theme';
import { RectButton } from 'react-native-gesture-handler';
import { RoundedIcon, Text } from '../../components';
import { HomeRoutes } from '../../components/Navigation';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface BaseDrawerItem{
  icon: string;
    label: string;
    color:keyof Theme["colors"];
}

interface ScreenDrawerItem extends BaseDrawerItem{
  screen: keyof HomeRoutes;
}

interface OnPressDrawerItem extends BaseDrawerItem{
  onPress: (navigation: ReturnType<typeof useNavigation>) => void
}

export type DrawerItemProps = ScreenDrawerItem | OnPressDrawerItem;


const DrawerItem = ({ icon, label,color,...props }: DrawerItemProps) => {
    
  const navigation = useNavigation<
    DrawerNavigationProp<HomeRoutes, "OutfitIdeas">
  >();

  return (
    <>
       <RectButton
        onPress={() => 
          "screen" in props 
            ? navigation.navigate(props.screen)
            : props.onPress(navigation)    
        }
       >
           <Box flexDirection="row"
            alignItems="center" padding="m"//@ts-ignore
            borderRadius="m"
           >
               <RoundedIcon  //@ts-ignore
                    backgroundColor={color} color="white"
                    size={24} name={icon}
               />
               <Text variant="body" marginLeft="m">
                   {label}
                </Text>
           </Box>
       </RectButton>
    </>
  );
}

export default DrawerItem;