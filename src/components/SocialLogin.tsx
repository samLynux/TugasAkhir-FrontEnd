import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Box } from './Theme';

const Google = () => (
  <Svg height={40} width="50%" viewBox="0 0 20 20" fill="none">
    <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
  </Svg>
);
const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
  },
});
interface SocialLoginProps {
  children: ReactNode;
}

const SociaIcon = ({ children }: SocialLoginProps) => {
  return (
    <Box
      backgroundColor="white" //@ts-ignore
      margin="m"
      width={44}
      height={44}
      borderRadius="l"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  );
};

const SocialLogin = () => {
  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center">
      <SociaIcon>
        <Google />
      </SociaIcon>
      <SociaIcon>
        <Google />
      </SociaIcon>
      <SociaIcon>
        <Google />
      </SociaIcon>
    </Box>
  );
};

export default SocialLogin;
