import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { Box, Button, Container, Text } from '../components';

import TextInput from '../components/Form/TextInput';
import { Routes } from '../components/Navigation';
import * as Yup from "yup"
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Footer from '../components/Footer';
import { Linking } from 'react-native';
// import { TextInput } from 'react-native';


const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
})

  

//@ts-ignore
const ForgotPassword = ({ navigation }: StackNavigationProp<Routes, 'ForgotPassword'>) => {
  const footer = <Footer 
      title="Don't work?" 
      action='Try another way'
      onPress={() => Linking.openURL("mailto:help@support.com")}
    />;
  
  const {control, 
    handleSubmit, 
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema)
  });

//@ts-ignore
  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("PasswordChange")
    
  }


  return (
    <Container {...{ footer }} pattern={2}>
      <Box padding="xl" justifyContent="center" flex={1}>
        <Text variant="title1" textAlign="center">
          Forgot Password?
        </Text>
        <Text variant="body" textAlign="center">
          Enter the email address associated with your account
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
          
        
          
          
          <Box alignItems="center" marginTop="m">
            <Button variant='primary' onPress={handleSubmit(onSubmit)}
              label='Reset Password'/>
          </Box>
        
      </Box>
    </Container>
  );
};

export default ForgotPassword;
