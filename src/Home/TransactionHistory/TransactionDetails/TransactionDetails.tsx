
import  React, {  useEffect } from 'react';
import {  View } from 'react-native';
import { Text } from '../../../components';
import { HomeNavigationProps } from '../../../components/Navigation';





const TransactionDetails = ({ navigation, route}: HomeNavigationProps<"TransactionDetails">) => {
    
    
    //@ts-ignore
    const {id} = route ? route.params : 3

    console.log(id);
    
    

    


    return (
        <>
        <View>
            <Text>{id}</Text>
        </View>
        </>
    )
}

export default TransactionDetails;