import  React from 'react';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SocialLogin from './SocialLogin';
import { Box, Text } from './Theme';

interface FooterProps {
    onPress: () => void;
    title: string;
    action: string;
    socialLogin?: boolean;
}


const Footer = ({title, action, onPress, socialLogin}: FooterProps) => {
    


  return (
    <>
      {socialLogin && <SocialLogin />}
      
      <Box alignItems="center">
        <TouchableWithoutFeedback  {...{onPress}}
            //@ts-ignore
            variant="transparent">
          <Box flexDirection="row">
            <Text variant="body" color="white">
              {title}
            </Text>
            <Text marginLeft="s" variant="body" color="primary">
                {action}
            </Text>
          </Box>
        </TouchableWithoutFeedback>
      </Box>
    </>
  );
}

export default Footer;