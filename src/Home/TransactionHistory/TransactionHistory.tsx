import  React from 'react';
import { ScrollView } from 'react-native';
import { Box, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import Graph, { DataPoint } from './Graph/Graph';
import Transaction from './Transaction';

// const minDate = new Date("2019-09-01").getTime();
// const maxDate = new Date("2020-02-01").getTime();

const data: DataPoint[] = [
    {
        date: new Date("2019-09-01").getTime(),
        value:10,
        color: "pink",
        id: 1000000,
    },
    {
        date: new Date("2019-10-01").getTime(),
        value:2,
        color: "primary",
        id: 2000000,
    },
    {
        date: new Date("2019-11-01").getTime(),
        value:10,
        color: "secondary",
        id: 3000000,
    },
    {
        date: new Date("2019-12-01").getTime(),
        value:4,
        color: "light_blue",
        id: 4000000,
    },
    {
        date: new Date("2020-01-01").getTime(),
        value:6,
        color: "pink",
        id: 5000000,
    },
    {
        date: new Date("2020-02-01").getTime(),
        value:1,
        color: "dark_blue",
        id: 6000000,
    },
    {
        date: new Date("2020-03-01").getTime(),
        value:12,
        color: "black",
        id: 7000000,
    },
]


const TransactionHistory = ({ navigation}: HomeNavigationProps<"TransactionHistory">) => {
   
  return (
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
                onPress: () => true
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
                    $698.3782 
                </Text>
            </Box>
            <Box
                backgroundColor="secondary" //@ts-ignore
                borderRadius="m"
                padding="m"
            >
                <Text>
                    All time
                </Text>
            </Box>

        </Box>
        <Graph data={data}/>
        <ScrollView>
            {data.map((transaction) => (
                <Transaction key={transaction.id} transaction={transaction}/>
            ))}
        </ScrollView>
        </Box>
        
    </Box>
  );
}

export default TransactionHistory;