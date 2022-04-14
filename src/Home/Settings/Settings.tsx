import  React from 'react';
import { Box, ContentFooter, Header } from '../../components';

import { HomeNavigationProps } from '../../components/Navigation';
import { DrawerActions } from '@react-navigation/native';
import Notification from './Notification';


// const {width} = Dimensions.get("window")




const Settings = ({ navigation}: HomeNavigationProps<"Settings">) => {
   
      
  return (
    <>
    <ContentFooter>
    
    <Box  backgroundColor="white">
        
        <Header
            dark
            title='Notifications'
            left={{
                icon:"menu",
                onPress: () => navigation.dispatch(DrawerActions.openDrawer())
            }}
            right={{
                icon:"share",
                onPress: () => true
            }}
        />
        <Box
            padding="m"
        >
            <Notification
                title='Outfit Ideas'
                description='Receive daily notification'
            />
            <Notification
                title='Discount & Sales'
                description='Buy the stuff you love for less'
            />
            <Notification
                title='Stock Notifications'
                description='If the product you love comes back'
            />
            <Notification
                title='New Stuff'
                description='Hear first, wear first'
            />
            
        </Box>
        
    </Box>
    </ContentFooter>
    </>
  );
}

export default Settings;