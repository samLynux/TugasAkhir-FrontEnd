import React, { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    // lineHeight: 80,
    fontFamily: 'SFProText-Regular',
    // color:"white",
    textAlign: 'center',
  },
});

interface ButtonProps {
  variant: 'default' | 'primary' | 'transparent';
  label: string;
  onPress: () => void;
  children?: ReactNode;
  style?: RectButtonProps["style"]
}

const Button = ({ variant, label, onPress, children, style }: ButtonProps) => {
  const backgroundColor = variant === 'primary' ? '#2CB9B0' : 'rgba(12,13,52,0.05)';
  const color = variant === 'primary' ? 'white' : '#0C0D34';
  return (
    <RectButton style={[styles.container, style, { backgroundColor }]} {...{ onPress }}>
      {children ? children : <Text style={[styles.label, { color }]}>{label}</Text>}
    </RectButton>
  );
};

Button.defaultProps = {
  variant: 'default',
};

export default Button;
