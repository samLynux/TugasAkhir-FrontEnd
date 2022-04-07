import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { Box, Button, Container, Text } from '../components';
import Checkbox from '../components/Form/Checkbox';
import TextInput from '../components/Form/TextInput';
import { Routes } from '../components/Navigation';
import * as Yup from "yup"
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Footer from '../components/Footer';
// import { TextInput } from 'react-native';


const ForgotPasswordSchema = Yup.object().shape({
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
const ForgotPassword = ({ navigation }: StackNavigationProp<Routes, 'ForgotPassword'>) => {
  const footer = <Footer 
      title="Don't have account?" 
      action='Sign up here'
      onPress={() => console.log("ForgotPassword")}
    />;
  
  const {control, 
    handleSubmit, 
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema)
  });

//@ts-ignore
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
          You forgot 
        </Text>
        <Text variant="body" textAlign="center">
          duck 
        </Text>
        
{/* @ts-ignore */}
        <TextInput
          name="email"
          icon="mail"
          placeholder="Email"
          control={control}
          autoCapitalize="none"
          autoCompleteType="email"
          returnKeyType='next'
          returnKeyLabel='next'
        />
        <TextInput
          name="password"
          icon="lock"
          placeholder="password"
          control={control}
          secureTextEntry
          autoCapitalize="none"
          autoCompleteType="password"
          returnKeyType='go'
          returnKeyLabel='go'

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

export default ForgotPassword;
