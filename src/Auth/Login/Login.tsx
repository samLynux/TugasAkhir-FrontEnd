import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { Box, Button, Container, Text } from '../../components';
import Checkbox from '../../components/Form/Checkbox';
import TextInput from '../../components/Form/TextInput';
import { Routes } from '../../components/Navigation';
import SocialLogin from '../../components/SocialLogin';



const emailValidator = (email: string) => {
  
  const result = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email,
  );

  

  return result
};

const passwordValidator = (password: string) => true;

//@ts-ignore
const Login = ({ navigation }: StackNavigationProp<Routes, 'Login'>) => {
  const footer = (
    <>
      <SocialLogin />
      <Box alignItems="center">
        <Button label="" onPress={() => alert('signup')} variant="transparent">
          <Box flexDirection="row">
            <Text variant="body" color="white">
              DOnt have account?
            </Text>
            <Text marginLeft="s" variant="body" color="primary">
            
              Sign up
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  );

  return (
    <Container {...{ footer }}>
      <Box padding="xl">
        <Text variant="title1" textAlign="center">
          Welcome back
        </Text>
        <Text variant="body" textAlign="center">
          use your credentials and login
        </Text>
        <Box marginBottom="m">
          <TextInput
            icon='mail'
            placeholder='Enter email' //@ts-ignore
            validator={emailValidator}
          />
        </Box>
        <TextInput
          icon='lock' 
          placeholder='Enter Password' //@ts-ignore
          validator={passwordValidator}
        />
        <Box flexDirection="row" 
          justifyContent="space-between"
        >
          <Checkbox label="remember me"/>
          <Button label='' variant='transparent' onPress={() => true}>
            <Text color="primary">Forgot Password</Text>
          </Button>
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button variant='primary' onPress={() => true}
            label='Log in'/>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
