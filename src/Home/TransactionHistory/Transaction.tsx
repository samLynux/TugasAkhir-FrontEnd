import moment from 'moment';
import  React from 'react';
import { Box, Text } from '../../components';
import { DataPoint } from './Graph/Graph';



interface TransactionProps {
    transaction: DataPoint;
 }
 


const Transaction = ({transaction}: TransactionProps) => {
   
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
            backgroundColor={transaction.color} 
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
            {`$${transaction.value} - ${moment(
                transaction.date
              ).format("DD MMM, YYYY")
            }`}
          </Text>
        </Box>
      </Box>
      <Box>
        <Text>See More</Text>
      </Box>
    </Box>
   </>
  );
}

export default Transaction;