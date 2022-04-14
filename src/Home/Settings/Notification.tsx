import  React, { useState } from 'react';
import { Box,  Text, theme } from '../../components';

import { Switch } from 'react-native';

// const {width} = Dimensions.get("window")

interface NotificationProps {
    title: string;
    description: string;
}


const Notification = ({title, description}: NotificationProps) => {
   const [toggled, setToggled] = useState(false)
      
  return (
    <> 
    <Box flexDirection="row" marginBottom="m">
        <Box flex={1} justifyContent="center">
            <Text variant="title3">{title}</Text>
            <Text variant="body">{description}</Text>
        </Box>
        <Box paddingVertical="m">
            <Switch 
                value={toggled}
                onValueChange={setToggled}
                trackColor={{
                    true: theme.colors.secondary,
                    false: theme.colors.default
                }}
            />
        </Box>
    </Box>
    </>
  );
}

export default Notification;