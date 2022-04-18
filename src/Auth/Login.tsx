import React from 'react';
import { Box, Button, Container, Text } from '../components';
import Checkbox from '../components/Form/Checkbox';
import TextInput from '../components/Form/TextInput';
import {  AuthNavigationProps } from '../components/Navigation';
import * as Yup from "yup"
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Footer from '../components/Footer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';


const LoginSchema = Yup.object().shape({
  email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .max(15, 'Password must not exceed 15 characters'),
    
})



const Login = ({ navigation }: AuthNavigationProps<"Login"> ) => {
  const footer = <Footer 
      socialLogin
      title="Don't have account?" 
      action='Sign up here'
      onPress={() => navigation.navigate("Signup")}
    />;
  
  const {control, 
    handleSubmit, 
  } = useForm({
    resolver: yupResolver(LoginSchema)
  });

//@ts-ignore
  const onLogin = (data) => {
    
    console.log(data);
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [
        {name: "Home"},
      ]
    }))
  }

  const checked = () => {
    // console.log("xxxx");
    
  }
  

  return (
    <Container {...{ footer }} pattern={0}>
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

            <TouchableWithoutFeedback  onPress={() => navigation.navigate("ForgotPassword")}
                //@ts-ignore
                variant="transparent">
              <Box flexDirection="row">
                <Text variant="body">
                  Forgot Password?
                </Text>
              </Box>
            </TouchableWithoutFeedback>
          </Box>
          
          
          <Box alignItems="center" marginTop="m">
            <Button variant='primary' onPress={(handleSubmit(onLogin))}
              label='Log in'/>
          </Box>
        
      </Box>
    </Container>
  );
};

export default Login;
