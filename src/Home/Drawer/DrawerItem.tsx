import  React from 'react';


import { Theme , Box} from '../../components/Theme';
import { RectButton } from 'react-native-gesture-handler';
import { RoundedIcon, Text } from '../../components';

export interface DrawerItemProps {
    icon: string;
    label: string;
    color:keyof Theme["colors"];
    screen: string;
}


const DrawerItem = ({screen, icon, label,color }: DrawerItemProps) => {
    


  return (
    <>
       <RectButton>
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