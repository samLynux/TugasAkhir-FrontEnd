import  React from 'react';
import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RoundedIconButton from './RoundedIconButton';

import { Box, Text } from './Theme';

interface HeaderProps {
    left: {
        onPress: () => void;
        icon: string;
    };
    title: string;
    right?: {
        onPress: () => void;
        icon: string;
    };
    dark: boolean;
}


const Header = ({title, left, right,dark}: HeaderProps) => {
    
const color = dark ? "black" : "white"

const insets = useSafeAreaInsets();
  return (
    <>
      <Box alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal="m"
        style={{marginTop: insets.top}}
      >
        <RoundedIconButton
            name={left.icon}
            color="black"
            backgroundColor='black'
            onPress={left.onPress}
            size={32}
        />
        <Text variant="header"
            color={color}
        >
            {title.toUpperCase()}
        </Text>
        {
          right ? (
              <RoundedIconButton 
                name={right.icon} 
                color="black"
                backgroundColor='black'
                onPress={right.onPress}
                size={32}
            />
          ) : (
            <View style={{width:22}}/>
          )
        }
      </Box>
    </>
  );
}

Header.defaultProps = {
    dark: false
}

export default Header;