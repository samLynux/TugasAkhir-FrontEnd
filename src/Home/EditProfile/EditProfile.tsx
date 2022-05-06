import { DrawerActions } from '@react-navigation/native';
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
    const [[user, setUser], [userUpdater, setUserUpdater]] = useContext(UserContext);
    
    
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
                <Configuration/>
                <PersonalInfo
                    changed={() =>  setUserUpdater(!userUpdater)}
                />
            </Tabs>
        </Box>
        </>
    )
}

export default EditProfile;