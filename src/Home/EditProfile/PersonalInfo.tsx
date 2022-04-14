import { yupResolver } from '@hookform/resolvers/yup';
import  React, { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import {  Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Box, Text } from '../../components';
import TextInput from '../../components/Form/TextInput';
import CheckboxGroup from './CheckboxGroup';
import * as Yup from "yup"

const {width} = Dimensions.get("window")
const LoginSchema = Yup.object().shape({
  email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters')
    .max(15, 'Password must not exceed 15 characters'),
    
})



// interface PersonalInfoProps{
//   children: ReactNode;
// }

const genders = [
  {value: "male",   label: "Male"},
  {value: "female",   label: "Female"},
]

const PersonalInfo = () => {
  const {control, 
    handleSubmit, 
  } = useForm({
    resolver: yupResolver(LoginSchema)
  });
      
  return (
    <>
      <ScrollView>
        <Box padding="m">
            <Text variant="body">
                Account Information
            </Text>

          <Box marginBottom="m">
            <TextInput
              name="name"
              icon="user"
              placeholder="Name"
              control={control}
              autoCapitalize="none"
              autoCompleteType="name"
            />
          </Box>
          <Box marginBottom="m">
            <TextInput
              name="password"
              icon="lock"
              placeholder="password"
              control={control}
              secureTextEntry
              autoCapitalize="none"
              autoCompleteType="password"

            />
          </Box>

          <Box marginBottom="m">
            <TextInput
              name="address"
              icon="map-pin"
              placeholder="Address"
              control={control}
              autoCapitalize="none"
              autoCompleteType="street-address"
            />
          </Box>
          

          <CheckboxGroup options={genders} radio/>

        </Box>
        
    </ScrollView>
    </>
  );
}

export default PersonalInfo;