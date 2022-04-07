import React  from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps as RNTextInputProps, Text } from 'react-native';
import { Box } from '../Theme';
import { Feather as Icon } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';



interface TextInputProps extends RNTextInputProps {
  icon: string;
  name: string;
  placeholder: string;

  control: any;
  secureTextEntry: any;
}


const TextInput = ({ icon, control, name,placeholder, secureTextEntry }: TextInputProps) => {

  const color = "black" 
 


  return (
    <Box flexDirection="row" alignItems="center" height={48} //@ts-ignore
        //@ts-ignore
        borderWidth={StyleSheet.hairlineWidth} borderRadius="s" borderColor={color}
    >
      <Box padding="s">
        <Icon //@ts-ignore
          name={icon} size={16} {...{color}}/>
      </Box>
      
      <Controller
            control={control}  
            name={name}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
              <>
                <RNTextInput
                  value={value} 
                  onChangeText={(onChange)}
                  onBlur={onBlur}
                  underlineColorAndroid="transparent" 
                  placeholder={placeholder}
                  secureTextEntry={secureTextEntry}
                />
                {/* {(error  && (
                  <Text>{error.message}</Text>
                ))} */}
                {
                  (value !== undefined) && (
                    <>
                    <Box height={20} width={20} //@ts-ignore
                      borderRadius="m"
                      justifyContent="center" alignItems="center"
                      backgroundColor={ !error ? "title" : "pink"}
                      >
                      <Icon name={!error ? "check" : "x"} color="white" />
                    </Box>
                    
                    </>
                  ) 
                }
              </>
            )}
          />
      
      
    </Box>
  );
};

export default TextInput;


