import React from 'react';

import { Box, Button, Container, Text } from '../components';

import TextInput from '../components/Form/TextInput';
import { AuthNavigationProps } from '../components/Navigation';
import * as Yup from "yup"
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Footer from '../components/Footer';
// import { TextInput } from 'react-native';


const SignupSchema = Yup.object().shape({
  email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .max(15, 'Password must not exceed 15 characters'),
  passwordConfirm: Yup.string()
    .equals([Yup.ref("password")], "Password dont match")
    .required('Password is required')
    
    
})

//@ts-ignore
const Signup = ({ navigation }:AuthNavigationProps<'Signup'>) => {
  const footer = <Footer 
      title="Already have account?" 
      action='Log in here'
      onPress={() => navigation.navigate("Login")}
    />;
  
  const {control, 
    handleSubmit, 
  } = useForm({
    resolver: yupResolver(SignupSchema)
  });

//@ts-ignore
  const onSignup = (data) => {
    // console.log("xxx");
    
    console.log(data);
    
  }

 
  

  return (
    <Container {...{ footer }} pattern={1}>
      <Box padding="xl">
        <Text variant="title1" textAlign="center">
          Create Account 
        </Text>
        <Text variant="body" textAlign="center">
          We want to know your email, password, and name 
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
          returnKeyType='next'
          returnKeyLabel='next'

        />
        <TextInput
          name="passwordConfirm"
          icon="lock"
          placeholder="Confirm password"
          control={control}
          secureTextEntry
          autoCapitalize="none"
          autoCompleteType="password"
          returnKeyType='go'
          returnKeyLabel='go'

        />
          
        
         
          
          
          <Box alignItems="center" marginTop="m">
            <Button variant='primary' onPress={handleSubmit(onSignup)}
              label='Create Account'/>
          </Box>
        
      </Box>
    </Container>
  );
};

export default Signup;
