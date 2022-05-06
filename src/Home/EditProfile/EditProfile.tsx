import { CommonActions, DrawerActions } from '@react-navigation/native';
import  React, { useContext } from 'react';
import { Box, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import { UserContext } from '../services/user.context';
import Configuration from './Configuration';
import PersonalInfo from './PersonalInfo';
import Tabs, { Tab } from './Tabs';



const tabs: Tab[] = [
    {id: "configuration", label: "Configuration"},
    {id: "info", label: "Personal Info"},
]


const EditProfile = ({ navigation}: HomeNavigationProps<"EditProfile">) => {//@ts-ignore
    const [[user], [userUpdater, setUserUpdater]] = useContext(UserContext);
    
    
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
                        icon:"menuunfold",
                        onPress: () => navigation.dispatch(DrawerActions.openDrawer())
                    }}
                />
                </Box>
                
            </Box>
            
            <Box >
                <Box marginVertical="m" style={{marginTop:50}}>
                    <Text variant="title1" textAlign='center'>
                        {(user && user.firstname && user.lastname) ?
                            (user.firstname +" " + user.lastname ):
                            "Me"
                        }
                    </Text>
                    <Text variant="body" textAlign='center'>
                        {user && user.email}
                    </Text>
                    <Text variant="body" textAlign='center'>
                        {(user && user.address) ?
                            (user.address ):
                            "Address not inputed yet"
                        }
                    </Text>
                </Box>
            </Box>
            <Tabs tabs={tabs} >
                <Configuration
                    timedOut={() => {
                        alert("You are not logged in/ Your Login has Timed Out")
                        navigation.dispatch(CommonActions.reset({
                            index: 0,
                            routes: [
                            {name: "Authentication"},
                            ]
                        }))
                    }}
                />
                <PersonalInfo
                    changed={() =>  setUserUpdater(!userUpdater)}
                    timedOut={() => {
                        alert("You are not logged in/ Your Login has Timed Out")
                        navigation.dispatch(CommonActions.reset({
                            index: 0,
                            routes: [
                            {name: "Authentication"},
                            ]
                        }))
                    }}
                />
            </Tabs>
        </Box>
        </>
    )
}

export default EditProfile;