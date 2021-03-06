import React from 'react';

import { Box, Button, Container, Text } from '../components';
import { Feather as Icon } from '@expo/vector-icons';

import ClosedButton from '../components/ClosedButton';
import { AuthNavigationProps } from '../components/Navigation';
// import { TextInput } from 'react-native';




//@ts-ignore
const PasswordChanged = ({ navigation }:AuthNavigationProps<'PasswordChanged'>) => {
  const footer = (
      <Box flexDirection="row" justifyContent="center">
        <ClosedButton onPress={() => navigation.navigate("Login")}/>
      </Box>
    );
  
    
  const onPushedBtn = () => {
    navigation.navigate("Login")
  }

  

  return (
    <Container {...{ footer }} pattern={2}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box
          backgroundColor="light_green"  alignItems="center"
          opacity={0.2} justifyContent="center"
          style={{height: 60, width: 60, borderRadius:30}}
        >
          <Text color="black" textAlign="center">
            <Icon name='check' size={32}/>
          </Text>
          
        </Box>
        
        <Text variant="title1" textAlign="center">
          Your password  has been changed
        </Text>
        <Text variant="body" textAlign="center">
          Close this and log in again
        </Text>
        

          <Box alignItems="center" marginTop="m">
            <Button variant='primary' onPress={onPushedBtn}
              label='Go back to Login'/>
          </Box>
        
      </Box>
    </Container>
  );
};

export default PasswordChanged;
