import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {  Image, Dimensions } from 'react-native';
import { Box, Button, Text } from '../../components';
import { Routes } from '../../components/Navigation';



const { width } = Dimensions.get('window');
const picture = {
  src: require('../../../assets/5.png'),
  width: 3383,
  height: 5074,
};

//@ts-ignore
const Welcome = ({ navigation }: StackNavigationProp<Routes, 'Welcome'>) => {
  return (
    <Box flex={1} backgroundColor="white">
      <Box
        flex={1}
        backgroundColor="black"
        //@ts-ignore
        borderBottomRightRadius="xxl"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          source={picture.src}
          style={{
            width: width - 75,
            height: ((width - 75) * picture.height) / picture.width,
          }}
        />
      </Box>

      <Box
        flex={1}
        //@ts-ignore
        borderTopLeftRadius="xxl"
      >
        <Box
          flex={1}
          backgroundColor="black"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        >
          <Box
            backgroundColor="white"
            justifyContent="space-evenly"
            alignItems="center"
            flex={1} //@ts-ignore
            borderTopLeftRadius="xxl"
            padding="xl"
          >
            <Text variant="title2">Lets start</Text>
            <Text variant="body">Login or Register</Text>
            <Button
              variant="primary"
              label="have account? Login"
              onPress={() => navigation.navigate('Login')}
            />
            <Button 
              label="Join? Register" 
              onPress={() => navigation.navigate('Signup')} />
            <Button
              variant="transparent"
              label="Forgot password?"
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
