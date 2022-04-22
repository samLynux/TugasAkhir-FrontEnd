import  React from 'react';


import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Button} from '../../components';


interface FooterProps {
    onPress: () => void;
    label: string;
}


const Footer = ({label, onPress}: FooterProps) => {
    const insets = useSafeAreaInsets();    


  return (
    <Box backgroundColor="secondary" //@ts-ignore
        padding="m" borderTopLeftRadius="xxl"
    >
      
      <Box alignItems="center"
        style={{
            paddingBottom: insets.bottom
        }}
      >
        <Button label={label} onPress={onPress}
            variant="primary">
          
        </Button>

        {/* <Box flexDirection="row">
        <Text variant="body" color="white">
            {label}
        </Text>
        </Box> */}
      </Box>
    </Box>
  );
}

export default Footer;