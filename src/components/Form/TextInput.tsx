import React, { ReactNode } from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { Box } from '../Theme';
import { Feather as Icon } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    // lineHeight: 80,
    fontFamily: 'SFProText-Regular',
    // color:"white",
    textAlign: 'center',
  },
});

interface TextInputProps {
  placeHolder: string;
  icon: string;
  validator: (input: string) => boolean;
}

const TextInput = () => {
  return (
    <Box flexDirection="row" alignItems="center">
      {/* <Icon name={icon} /> */}
      <RNTextInput underlineColorAndroid="transparent" />
    </Box>
  );
};

export default TextInput;


