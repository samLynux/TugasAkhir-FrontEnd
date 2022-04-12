import  React from 'react';
import { Box, Header, Text } from '../../components';
import { HomeNavigationProps } from '../../components/Navigation';
import Graph, { DataPoint } from './Graph';

const data: DataPoint[] = [
    {
        date: new Date("2019-09-01").getTime(),
        value:0,
        color: "pink"
    },
    {
        date: new Date("2019-10-01").getTime(),
        value:2,
        color: "primary"
    },
    {
        date: new Date("2019-11-01").getTime(),
        value:10,
        color: "secondary"
    },
    {
        date: new Date("2019-12-01").getTime(),
        value:4,
        color: "light_blue"
    },
    {
        date: new Date("2020-01-01").getTime(),
        value:6,
        color: "pink"
    },
    {
        date: new Date("2020-02-01").getTime(),
        value:1,
        color: "dark_blue"
    },
    {
        date: new Date("2020-03-01").getTime(),
        value:12,
        color: "black"
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
        <Box padding="m">
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
        </Box>
        
    </Box>
  );
}

export default TransactionHistory;