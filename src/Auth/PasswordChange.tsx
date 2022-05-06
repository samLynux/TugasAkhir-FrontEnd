import React from 'react';

import { Box, Button, Container, Text } from '../components';

import TextInput from '../components/Form/TextInput';
import * as Yup from "yup"
import {  useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Footer from '../components/Footer';
import { Linking } from 'react-native';
import { AuthNavigationProps } from '../components/Navigation';
import axios from 'axios';
// import { TextInput } from 'react-native';


const PasswordChangeSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .max(15, 'Password must not exceed 15 characters'),
  passwordConfirm: Yup.string()
    .equals([Yup.ref("password")], "Password dont match")
    .required('Password is required')
})

  

//@ts-ignore
const PasswordChange = ({ navigation, route }: AuthNavigationProps<'PasswordChange'>) => {
  const footer = <Footer 
      title="Don't work?" 
      action='Try another way'
      onPress={() => Linking.openURL("mailto:help@support.com")}
    />;
  
  const {control, 
    handleSubmit, 
  } = useForm({
    resolver: yupResolver(PasswordChangeSchema)
  });

  //@ts-ignore
  const {email} = route.params
  
//@ts-ignore
  const onSubmit = async (data) => {
   
    await axios.put("password", {
      email:email,
      password:data.password,
    }).then(() => {
      navigation.navigate("PasswordChanged")
    }).catch(() => {
      alert("Something wrong has occured")
      // console.log(err);
      
      navigation.navigate("ForgotPassword")
    })
    
    
  }


  return (
    <Container {...{ footer }} pattern={2}>
      <Box padding="xl" justifyContent="center" flex={1}>
        <Text variant="title1" textAlign="center">
          Change Password
        </Text>
        <Text variant="body" textAlign="center">
          Create a new password for your account
        </Text>
        

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
            <Button variant='primary' onPress={handleSubmit(onSubmit)}
              label='Reset Password'/>
          </Box>
        
      </Box>
    </Container>
  );
};

export default PasswordChange;
