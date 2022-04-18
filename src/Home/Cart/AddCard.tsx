
import  React  from 'react';
import { Box } from '../../components';
import CardLayout from './CardLayout';
import {Feather as Icon} from "@expo/vector-icons"








const AddCard = () => {
  
  return (
    <>
    <CardLayout
        backgroundColor='secondary'
        onPress={() => 
            console.log('xxx')
        }
    >
        <Box 
            flex={1} 
            justifyContent="center"
            alignItems="center" //@ts-ignore
            borderRadius="m"
            style={{backgroundColor: "rgba(255,255,255,0.2)"}}
        >
            <Icon name='plus' color="white" size={32} />
        </Box>
    </CardLayout>
    </>
  );
}

export default AddCard;