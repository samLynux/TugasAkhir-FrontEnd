
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import  React, {  useEffect, useState } from 'react';
import {  Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Box, Header, Text, theme } from '../../../components';
import LineItem from '../../../components/LineItem';
import { HomeNavigationProps } from '../../../components/Navigation';


interface TransactionDetail {
    createdAt: number,
    total:number,
 }

 interface TransactionItemsDetail {
    price: number,
    product:  {
        image: string,
        price: number,
        title: string,
      },
      product_title: string,
      quantity: 1,
 }


const TransactionDetails = ({ navigation, route}: HomeNavigationProps<"TransactionDetails">) => {
    const [transaction, setTransaction] = useState<TransactionDetail>()
    const [transactionItems, setTransactionItems] = useState<TransactionItemsDetail[]>([])
    
    //@ts-ignore
    const {id} = route ? route.params : 3

    
    
    

    useEffect(() => {
        axios.get(`orders/${id}`)
        .then((res) => {
            setTransaction(res.data);
            setTransactionItems(res.data.order_items);
            
        }).catch((err) => {
            console.log(err);
            if(err.response.data.statusCode === 403){
                alert("You are not logged in/ Your Login has Timed Out")
                navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [
                    {name: "Authentication"},
                    ]
                }))
            }
        })
        
    }, [id])


    return (
        <>
        <Box flex={1} backgroundColor="grey">
            <Header
                dark
                title='Transaction Details'
                left={{
                icon:"caretleft",
                    onPress: () => navigation.navigate("TransactionHistory")
                }}
            />
            <Box flex={1} marginVertical="m">
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal:8,
                }}
            >
                {transactionItems && (
                    transactionItems.map(i => (
                        <Box key={i.product_title}>
                            <Box padding="m" flexDirection="row" backgroundColor="light_blue">
                                <Box 
                                        width={120}
                                        height={120} //@ts-ignore
                                        borderRadius="m"
                                        style={{
                                            backgroundColor:"#BFEAF5",
                                        }}
                                >
                                    <Image style={StyleSheet.absoluteFillObject}
                                        source={{uri:i.product.image}}/>
                                </Box>
                                <Box padding="s" flex={1} justifyContent="center">
                                    <Text variant="title3" marginBottom="s" >{i.product.title}</Text>
                                    <Text variant="title3" >${i.product.price}</Text>
                                    <Text variant="title3" >Total: ${i.product.price * i.quantity}</Text>
                                    </Box>
                                    <Box justifyContent="center">
                                    <Box 
                                        backgroundColor="black" //@ts-ignore
                                        borderRadius="l"  //@ts-ignore
                                        width={theme.borderRadii.m *2}//@ts-ignore
                                        height={theme.borderRadii.m *2}
                                        justifyContent="center" alignItems="center"
                                    >
                                        <Text variant="header" color="white" >
                                        x {i.quantity}
                                        </Text>
                                    </Box>
                                    </Box>
                            </Box>
                        </Box>
                    ))
                )}
                
            </ScrollView>
            
            {transaction && (
                <>
                <Box padding="s">
                <LineItem 
                    label='Transaction Date:'
                    value={moment( transaction.createdAt).format("DD MMM, YYYY")}
                />
                <LineItem 
                    label='Delivery:'
                    value={"$12"}
                />
                <LineItem 
                    label='Total Amount:'
                    value={"$" +transaction.total.toString()}
                />
                </Box>
                </>
            )}
            
            
            </Box>
        </Box>
        </>
    )
}

export default TransactionDetails;