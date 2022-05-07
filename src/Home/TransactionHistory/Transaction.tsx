import moment from 'moment';
import  React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, Text } from '../../components';



interface TransactionProps {
    transaction: {
      createdAt: number,
      total:number,
      id: number;
    };
    onPress:  () => void;
 }
 


const Transaction = ({transaction, onPress}: TransactionProps) => {
   
  return (
   <>
    <Box 
      marginTop="l"
      flexDirection="row" 
      justifyContent="space-between"
      alignItems="center" 
    >
      <Box>
        <Box 
          flexDirection="row" 
          alignItems="center"
          marginBottom="s"
        >
          <Box 
            backgroundColor={"black"} 
            marginRight="s"
            style={{
              width: 10,
              height:10,
              borderRadius:5
            }}
          />  
          <Text variant="title3">
            {`#${transaction.id}`}
          </Text>
        </Box>
        <Box>
          <Text>
            {`$${transaction.total} - ${moment(
                transaction.createdAt
              ).format("DD MMM, YYYY") 
            }`}
          </Text>
        </Box>
      </Box>
      <Box marginRight="m">
        <BorderlessButton onPress={onPress} >
          <Text>See More</Text>
        </BorderlessButton>
      </Box>
    </Box>
   </>
  );
}

export default Transaction;