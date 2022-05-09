import React from 'react';

import { Box, Button, Container, Text } from '../components';

import TextInput from '../components/Form/TextInput';
import { AuthNavigationProps } from '../components/Navigation';
import * as Yup from "yup"
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Footer from '../components/Footer';
import axios from "axios"
import { Alert } from 'react-native';

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
  const onSignup = async (data) => {
    
    
    await axios.post("register", {
      email:data.email,
      password:data.password,
    }).then(() => {
      Alert.alert("User Registered!",
        "Please Log in with your new registered account",
        [
        {text: 'OK'},
        ],
        {cancelable: false}
      )
      navigation.navigate("Login")
    }).catch(() => {
      Alert.alert("Unvalid Email!",
        "This email has already been registered, please enter a new email or login",
        [
        {text: 'OK'},
        ],
        {cancelable: false}
      )
    })


    
    
  }

 

  return (
    <Container {...{ footer }} pattern={1}>
      <Box padding="m">
        <Text variant="title1" textAlign="center">
          Create Account 
        </Text>
        <Text variant="body" textAlign="center">
          We want to know your email, password, and name!
        </Text>

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
