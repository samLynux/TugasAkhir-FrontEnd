import  React from 'react';
import { RectButton } from 'react-native-gesture-handler';


import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Button, RoundedIcon} from '../../components';


interface FooterProps {
    favIcon: string;
    onBuy: () => void;
    onFav: () => void;
    onCart: () => void;
}


const Footer = ({onBuy, onCart, onFav, favIcon}: FooterProps) => {
    const insets = useSafeAreaInsets();    


  return (
    <Box backgroundColor="secondary" //@ts-ignore
        padding="m" borderTopLeftRadius="xxl"
    >
      
      <Box alignItems="center" flexDirection="row"
        style={{
            paddingBottom: insets.bottom
        }}
      >
        <RectButton  onPress={onFav}>
          <Box flexDirection="row"
            alignItems="center" padding="m"//@ts-ignore
            borderRadius="m"
           >
               <RoundedIcon  //@ts-ignore
                    backgroundColor="pink" color="pink"
                    size={36} name={favIcon}
               />
           </Box>
        </RectButton>
        <Button label="Buy now" onPress={onBuy}
          variant="primary"
          style={{width:200}}
        />
        <RectButton  onPress={onCart}>
          <Box flexDirection="row"
            alignItems="center" padding="m"//@ts-ignore
            borderRadius="m"
           >
               <RoundedIcon  //@ts-ignore
                    backgroundColor="dark_blue" color="pink"
                    size={36} name="shoppingcart"
               />
           </Box>
        </RectButton>

        
      </Box>
    </Box>
  );
}

export default Footer;