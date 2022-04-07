import  React, { useState }  from 'react';
import { Box, Text } from '../Theme';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

interface CheckboxProps {
    label: string;
    value: boolean;
    onChange: () => void
}


const Checkbox = ({label, value, onChange}: CheckboxProps) => {
    const [checked, setChecked] = useState(false);
    const checkPressed = () => {
        onChange()
        setChecked(!checked)
    }

  return (
    <RectButton onPress={checkPressed}
        style={{justifyContent:"center"}}
        
    >
        <Box flexDirection="row">
        
        <Box height={20} width={20} //@ts-ignore
            borderRadius="s" marginRight="s"
            justifyContent="center" alignItems="center"
            borderWidth={1} borderColor="primary"
            backgroundColor={checked ? "primary" : "white"}
        >
            <Icon name='check' color="white"/>
        </Box>
        <Text variant="body">{label}</Text>
        
        </Box>
    </RectButton>
  );
}

export default Checkbox;