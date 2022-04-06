import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Box, Button, Container, Text } from '../../components';
import { Routes } from '../../components/Navigation';
import SocialLogin from '../../components/SocialLogin';

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

interface LoginProps {}

const emailValidator = (email: string) => {
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
    email,
  );
};

//@ts-ignore
const Login = ({ navigation }: StackNavigationProp<Routes, 'Login'>) => {
  const footer = (
    <>
      <SocialLogin />
      <Box alignItems="center">
        <Button label="" onPress={() => alert('signup')} variant="transparent">
          <Box flexDirection="row">
            <Text variant="body" color="white">
              {' '}
              DOnt have account?
            </Text>
            <Text marginLeft="s" variant="body" color="primary">
              {' '}
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
        <TextInput placeholder="please enter your email" />
      </Box>
    </Container>
  );
};

export default Login;
