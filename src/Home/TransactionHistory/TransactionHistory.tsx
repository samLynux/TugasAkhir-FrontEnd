import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import  React, { useEffect, useState } from 'react';
import {     ScrollView } from 'react-native';
import { Box, ScrollableContent, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import Graph from './Graph/Graph';
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

// const defaultData = [
//     {
//         date: new Date("2022-04-01").getTime(),
//         total:105,
        
//     },
//     {
//         date: new Date("2022-05-01").getTime(),
//         total:1485,
        
//     },
// ]


const TransactionHistory = ({ navigation}: HomeNavigationProps<"TransactionHistory">) => {
   const isFocused = useIsFocused()
    const [transactions, setTransactions] = useState([])
    const [transactionsChart, setTransactionsChart] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        axios.get("orders")
            .then((e) => {
                // console.log(e.data.data);
                setTransactions(e.data.data)
                
            })
        
        
        


        axios.get("chart")
            .then((response) => {
                const testArr = response.data.map((res: any) => ({
                    total: res.sum,
                    date: new Date(res.date).getTime(),
                }))
                
                
                setTransactionsChart(testArr);
            })


        

        
    }, [isFocused])

    useEffect(() => {
        let newTotal = 0
        transactions.forEach((item) => { //@ts-ignore
            newTotal += item.total 
        });
        setTotal(newTotal)
    }, [transactions])


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
                {transactions.map((transaction) => ( //@ts-ignore
                    <Transaction key={transaction.id} transaction={transaction} 
                        onPress={() => { //@ts-ignore
                            navigation.navigate("TransactionDetails",{id: transaction.id})
                        }}/>
                ))}
            </ScrollView>
            </Box>
            
        </Box>
    </ScrollableContent>
  );
}

export default TransactionHistory;