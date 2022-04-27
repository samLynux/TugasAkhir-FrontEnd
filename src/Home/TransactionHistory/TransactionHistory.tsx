import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import  React, { useEffect, useState } from 'react';
import {     ScrollView } from 'react-native';
import { Box, ScrollableContent, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import Graph, { DataPoint } from './Graph/Graph';
import Transaction from './Transaction';


// const footerHeight = Dimensions.get("window").width/3.5 ;

// const styles = StyleSheet.create({
//     footer: {
//         ...StyleSheet.absoluteFillObject,
//         width:undefined,
//         height: undefined,
//         borderTopLeftRadius: 75,

//     }
// })
// const aspectRatio = 3;
const maxDate = new Date().getTime();

const defaultData: DataPoint[] = [
    {
        date: new Date("2021-09-01").getTime(),
        total:10,
        id: 1000000,
    },
    {
        date: new Date("2021-11-01").getTime(),
        total:10,
        id: 3000000,
    },
    {
        date: new Date("2021-12-01").getTime(),
        total:4,
        id: 4000000,
    },
    {
        date: new Date("2022-01-01").getTime(),
        total:6,
        id: 5000000,
    },
    {
        date: new Date("2022-02-01").getTime(),
        total:3,
        id: 6000000,
    },
    {
        date: new Date("2022-03-01").getTime(),
        total:12,
        id: 7000000,
    },
    {
        date: new Date("2022-04-01").getTime(),
        total:15,
        id: 8000000,
    },
]


const TransactionHistory = ({ navigation}: HomeNavigationProps<"TransactionHistory">) => {
   const isFocused = useIsFocused()
    const [transactions, setTransactions] = useState(defaultData)
    const [transactionsChart, setTransactionsChart] = useState(defaultData)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        console.log("change transaction here");
        axios.get("orders")
            .then((e) => {
                // console.log(e.data.data);
                setTransactions(e.data.data)
            })
        setTransactionsChart(defaultData);

        let newTotal = 0
        transactions.forEach((item) => {
            newTotal += item.total 
        });
        setTotal(newTotal)
    }, [isFocused])
  return (
    <ScrollableContent>
        <Box 
            flex={1}
            backgroundColor="white"
        >
            <Header
                dark
                title='Transaction History'
                left={{
                icon:"menu",
                    onPress: () => navigation.openDrawer()
                }}
                right={{
                icon:"share",
                    onPress: () => console.log(transactions)
                    
                }}
            />
            <Box padding="m" flex={1}>
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
            <Graph data={transactionsChart} maxDate={maxDate}/>
            <ScrollView
                style={{
                    marginBottom:30,
                }}
                showsVerticalScrollIndicator={false}
                
            >
                {transactions.map((transaction) => (
                    <Transaction key={transaction.id} transaction={transaction}/>
                ))}
            </ScrollView>
            </Box>
            
        </Box>
    </ScrollableContent>
  );
}

export default TransactionHistory;