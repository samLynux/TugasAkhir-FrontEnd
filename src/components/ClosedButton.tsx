import  React from 'react';

import { Feather as Icon } from '@expo/vector-icons';
import { Box, Text } from './Theme';
import { RectButton } from 'react-native-gesture-handler';

interface ClosedButtonProps {
    onPress: () => void;
}


const ClosedButton = ({ onPress}: ClosedButtonProps) => {
    


  return (
    <>
    <RectButton {...{onPress}} >
      <Box alignItems="center" justifyContent="center"
        marginBottom="m"
        style={{height: 60, width: 60, borderRadius:30}}
        backgroundColor="white"
      >
            
            
            <Text variant="body" color="black">
                <Icon name='x' size={25}/>
            </Text>
        </Box>
      </RectButton>
    </>
  );
}

export default ClosedButton;