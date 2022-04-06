import React, { useState } from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps as RNTextInputProps } from 'react-native';
import { Box } from '../Theme';
import { Feather as Icon } from '@expo/vector-icons';



interface TextInputProps extends RNTextInputProps {
  icon: string;
  validator: (input: string) => boolean;
}
const Valid = true;
const Invalid = false;
const Pristine = null;
type InputState = typeof Valid | typeof Invalid | typeof Pristine;

const TextInput = ({ icon, validator, ...props }: TextInputProps) => {
  const [input, setInput] = useState("")
  const [state, setState] = useState<null | boolean>(null)
  
  const color = state === Pristine ? "black" : 
    (state === Valid) ? "light_green" : "pink"
  const onChangeText = (text: string) => {

    
    setInput(text);
    validate();
    
  }
  const validate = () => {
    const valid = validator(input)
    setState(valid)
  }
  // let emailAdress = "test@gmail.com";
  // let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // if (emailAdress.match(regexEmail)) {
  //   console.log(true);
    
  // } else {
  //   console.log(false);
  // }
  return (
    <Box flexDirection="row" alignItems="center" height={48} //@ts-ignore
        //@ts-ignore
        borderWidth={StyleSheet.hairlineWidth} borderRadius="s" borderColor={color}
    >
      <Box padding="s">
        <Icon //@ts-ignore
          name={icon} size={16} {...{color}}/>
      </Box>
      
      <RNTextInput 
        underlineColorAndroid="transparent" 
        onBlur={() => validate}
        onChangeText={onChangeText}
        placeholder={props.placeholder} />
      {
        (state === Valid || state === Invalid) && (
          <Box height={20} width={20} //@ts-ignore
            borderRadius="m"
            justifyContent="center" alignItems="center"
            backgroundColor={state === Valid ? "title" : "pink"}
            >
            <Icon name={state === Valid ? "check" : "x"} color="white" />
          </Box>
        ) 
      }
    </Box>
  );
};

export default TextInput;


