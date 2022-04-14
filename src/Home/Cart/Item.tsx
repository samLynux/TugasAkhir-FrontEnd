import  React from 'react';
import { Box  } from '../../components';

interface ItemProps{
    id?: number
}

const Item = ({id}: ItemProps) => {
   
    
  return (
    <>
       <Box padding="l" flexDirection="row" >
           <Box 
                width={120}
                height={120} //@ts-ignore
                borderRadius="m"
                style={{
                    backgroundColor:"yellow"
                }}
           >

           </Box>
       </Box>
    </>
  );
}

export default Item;