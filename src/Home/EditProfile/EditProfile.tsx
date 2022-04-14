import { DrawerActions } from '@react-navigation/native';
import  React from 'react';
import { Box, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import Configuration from './Configuration';
import PersonalInfo from './PersonalInfo';
import Tabs, { Tab } from './Tabs';



const tabs: Tab[] = [
    {id: "configuration", label: "Configuration"},
    {id: "info", label: "Personal Info"},
]


const EditProfile = ({ navigation}: HomeNavigationProps<"EditProfile">) => {
    
    return (
        <>
        <Box 
            flex={1}
        >
           <Box flex={0.3} backgroundColor="white">
                <Box position="absolute" 
                    top={0} left={0} right={0} bottom={0} //@ts-ignore
                    borderBottomRightRadius="xxl"
                    backgroundColor="light_blue"
                >
                <Header
                    dark
                    title='Edit Profile'
                    left={{
                        icon:"menu",
                        onPress: () => navigation.dispatch(DrawerActions.openDrawer())
                    }}
                />
                </Box>
                
            </Box>
            
            <Box >
                <Box 
                    position="absolute"
                    alignSelf="center"
                    top={-50}
                    width={100} height={100}
                    backgroundColor="black" //@ts-ignore
                    borderRadius="xxl" 
                />
                <Box marginVertical="m" style={{marginTop:50}}>
                    <Text variant="title1" textAlign='center'>
                        Me
                    </Text>
                    <Text variant="body" textAlign='center'>
                        my@email.xxx
                    </Text>
                </Box>
            </Box>
            <Tabs tabs={tabs} >
                <Configuration/>
                <PersonalInfo/>
            </Tabs>
        </Box>
        </>
    )
}

export default EditProfile;