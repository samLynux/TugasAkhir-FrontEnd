import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import React from 'react';

import { Box, Button, Container, Text } from '../../components';
import Checkbox from '../../components/Form/Checkbox';
import TextInput from '../../components/Form/TextInput';
import { Routes } from '../../components/Navigation';
import SocialLogin from '../../components/SocialLogin';
import * as Yup from "yup"
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { TextInput } from 'react-native';


const LoginSchema = Yup.object().shape({
  email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password must be at least 4 characters')
      .max(15, 'Password must not exceed 15 characters'),
  })

  
// const emailValidator = (email: string) => {
  
//   const result = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
//     email,
//   );
//   return result
// };

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
  
  const {control, 
    handleSubmit, 
  } = useForm({
    resolver: yupResolver(LoginSchema)
  });

  const onLogin = (data) => {
    console.log(data);
    
  }

  const checked = () => {
    // console.log("xxxx");
    
  }
  

  return (
    <Container {...{ footer }}>
      <Box padding="xl">
        <Text variant="title1" textAlign="center">
          Welcome back
        </Text>
        <Text variant="body" textAlign="center">
          use your credentials and login
        </Text>
       
        <TextInput
          name="email"
          icon="mail"
          placeholder="Email"
          control={control}
        />
        <TextInput
          name="password"
          icon="lock"
          placeholder="password"
          control={control}
          secureTextEntry
        />
          
        
          <Box flexDirection="row" 
            justifyContent="space-between"
          >
            <Checkbox label="remember me"
              value={false}
              onChange={checked}
            />

            <Button label='' variant='transparent' onPress={() => true}>
              <Text color="primary">Forgot Password</Text>
            </Button>
          </Box>
          
          
          <Box alignItems="center" marginTop="m">
            <Button variant='primary' onPress={handleSubmit(onLogin)}
              label='Log in'/>
          </Box>
        
      </Box>
    </Container>
  );
};

export default Login;
