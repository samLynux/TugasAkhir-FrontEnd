import { yupResolver } from '@hookform/resolvers/yup';
import  React  from 'react';
import { useForm } from 'react-hook-form';

import { ScrollView } from 'react-native-gesture-handler';
import { Box, Button, Text } from '../../components';
import TextInput from '../../components/Form/TextInput';
import * as Yup from "yup"
import axios from 'axios';

// const {width} = Dimensions.get("window")
const AdditionalInfo = Yup.object().shape({
  firstname: Yup.string().nullable(true),
  lastname: Yup.string().nullable(true),
  address: Yup.string().nullable(true),
    
})



interface PersonalInfoProps{
  changed: () => void;
  timedOut: () => void;
}


const PersonalInfo = ({ changed, timedOut}: PersonalInfoProps) => {
  const {control, handleSubmit
  } = useForm({
    resolver: yupResolver(AdditionalInfo)
  });

  const onSignup = async (data: any) => {
    
    
    // console.log(data);
     await axios.put("users", {
      firstname: data.firstname,

      lastname: data.lastname,

      address: data.address,

    }).then(() => changed())
    .catch(err => {
      console.log(err);
      if(err.response.data.statusCode === 403){
          timedOut();
      }
    })

    alert("Personal Data Updated")
    
  }
      
  return (
    <>
      <ScrollView>
        <Box padding="m">
            <Text variant="body">
                Account Information
            </Text>

          <Box marginBottom="m">
            <TextInput
              name="firstname"
              icon="user"
              placeholder="First Name"
              control={control}
              autoCapitalize="none"
              autoCompleteType="name"
            />
          </Box>

          <Box marginBottom="m">
            <TextInput
              name="lastname"
              icon="user"
              placeholder="Last Name"
              control={control}
              autoCapitalize="none"
              autoCompleteType="name"
            />
          </Box>

          <Box marginBottom="m">
            <TextInput
              name="address"
              icon="map-pin"
              placeholder="Address"
              control={control}
              autoCapitalize="none"
              autoCompleteType="street-address"
            />
          </Box>
          

          <Box alignItems="center" marginTop="m">
            <Button variant='primary' onPress={handleSubmit(onSignup)}
              label='Update Account Info'/>
          </Box>

        </Box>
        
    </ScrollView>
    </>
  );
}

export default PersonalInfo;