import { CommonActions, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import  React, { useEffect, useState } from 'react';
import {     ScrollView } from 'react-native';
import { Box,  Header, Text, Button } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import Graph from './Graph/Graph';
import Transaction from './Transaction';



const maxDate = new Date().getTime();

export interface TransactionData {
    createdAt: number,
    total:number,
    id: number;
 }

const TransactionHistory = ({ navigation}: HomeNavigationProps<"TransactionHistory">) => {
   const isFocused = useIsFocused()
    const [transactions, setTransactions] = useState<TransactionData[]>([])
    const [transactionsChart, setTransactionsChart] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        axios.get("orders")
            .then((e) => {
                setTransactions(e.data)
            }).catch((err) => {
                // console.log(err);
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
        
        axios.get("orders/chart")
            .then((response) => {
                const testArr = response.data.map((res: any) => ({
                    total: res.sum,
                    date: new Date(res.date).getTime(),
                }))
                
                
                setTransactionsChart(testArr);
            }).catch((err) => {
                // console.log(err);
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
    }, [isFocused])

    useEffect(() => {
        if(!transactions) return
        let newTotal = 0
        transactions.forEach((item) => { //@ts-ignore
            newTotal += item.total 
        });
        setTotal(newTotal)
    }, [transactions])


  return (
    <>
        <Box 
            flex={1}
            backgroundColor="white"
        >
            <Header
                dark
                title='Transaction History'
                left={{
                icon:"menuunfold",
                    onPress: () => navigation.openDrawer()
                }}
            />
            <Box padding="m" flex={1} >
            <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-end"
            >
                <Box>
                    <Text variant="header" opacity={0.3}>
                        Total Spent
                    </Text>
                    <Text variant="title1">
                        ${total}
                    </Text>
                </Box>
                {/* <Box
                    backgroundColor="secondary" //@ts-ignore
                    borderRadius="m"
                    padding="m"
                >
                    <Text>
                        All time
                    </Text>
                </Box> */}

            </Box>
            {transactions.length > 0 ?
            (
                <>
                <Graph data={transactionsChart} maxDate={maxDate}/>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom:60
                    }}
                    showsVerticalScrollIndicator={true}
                    
                >
                    {transactions.map((transaction) => ( 
                        <Transaction key={transaction.id} transaction={transaction} 
                            onPress={() => { 
                                
                                //@ts-ignore
                                navigation.navigate("TransactionDetails",{id: transaction.id})
                            }}/>
                    ))}
                </ScrollView>
                </>
            ):(
                <Box flex={1} justifyContent="center" alignItems="center">
                    <Text textAlign="center" padding="xl">
                        No Transactions
                    </Text>
                    <Button 
                        label='Go To Catalog'
                        onPress={() => navigation.navigate("Catalog")}
                    />
                </Box>
            )
            }
            
            </Box>
            
        </Box>
    </>
  );
}

export default TransactionHistory;