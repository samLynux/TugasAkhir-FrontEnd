import React  from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps as RNTextInputProps } from 'react-native';
import { Box, Text } from '../Theme';
import { Feather as Icon } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import RoundedIcon from '../RoundedIcon';



interface TextInputProps extends RNTextInputProps {
  icon: string;
  name: string;
  placeholder: string;

  control: any;
  secureTextEntry?: any;
}


const TextInput = ({ icon, control, name,placeholder, secureTextEntry }: TextInputProps) => {

  const color = "black" 
 


  return (
    <>
    
      
    <Controller
      control={control}  
      name={name}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
        <Box 
          flexDirection="row" 
          alignItems="center" 
          height={48} 
          marginTop="s"
          //@ts-ignore
          borderWidth={StyleSheet.hairlineWidth} borderRadius="s" borderColor={color}
        >
          <Box padding="s">
            <Icon //@ts-ignore
              name={icon} size={16} color={color}/>
          </Box>



            <Box flex={1}  flexDirection="row" justifyContent="space-between">
              <RNTextInput
                value={value} 
                onChangeText={(onChange)}
                onBlur={onBlur}
                underlineColorAndroid="transparent" 
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
              />
              
              {
                (value !== undefined) && (
                  <>
                  <Box padding="s">
                  <RoundedIcon
                    name={!error ? "check" : "x"}
                    backgroundColor={ !error ? "title" : "pink"}
                    color="black"
                    size={20}
                    />
                    </Box>
                  
                  </>
                ) 
              }
            </Box>
          </Box>
          {(error  && (
            <Text color="red" textAlign="center" marginBottom="s">
              {error.message}
            </Text>
          ))}
        </>
      )}
    />
      
      
    
    </>
  );
};

export default TextInput;


