
import  React, {useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Box, Button, Text } from '../../components';
import AddCard from './AddCard';
import Card, { CardBrand } from './Card';
import { CARD_HEIGHT } from './CardLayout';

interface CheckoutComponentProps{
    minHeight: number;
}



const cards = [
    {
        id: 0,
        type: CardBrand.VISA,
        last4Digits: 5467,
        expiration: "05/24"
    },
    {
        id: 1,
        type: CardBrand.MASTERCARD,
        last4Digits: 7575,
        expiration: "11/22"
    },
    {
        id: 2,
        type: CardBrand.VISA,
        last4Digits: 9127,
        expiration: "12/25"
    },
    {
        id: 3,
        type: CardBrand.MASTERCARD,
        last4Digits: 2579,
        expiration: "01/21"
    },
    {
        id: 4,
        type: CardBrand.VISA,
        last4Digits: 6567,
        expiration: "03/22"
    },
]

interface LineItemProps{
    label: string;
    value: number;
}

const LineItem = ({value, label} : LineItemProps) => {
    return(
        <Box flexDirection="row" paddingVertical="s">
            <Box flex={1}>
                <Text color="white" >{label}</Text>
            </Box>
            <Box>
                <Text color="white">${value}</Text>
            </Box>
        </Box>
    )
}


const CheckoutComponent = ({minHeight}:CheckoutComponentProps) => {
    const [selectedCard, setSelectedCard] = useState(cards[0].id)
    
  return (
    <>
    <Box 
        flex={1} 
        backgroundColor="secondary"
        style={{paddingTop: minHeight * 1.5}}
    >
        <Box
            flex={1} 
            padding="m"
        >
            <Box height={CARD_HEIGHT}>
                <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                >

                    <AddCard/>
                    {cards.map(card => (
                        <Card
                            key={card.id} 
                            card={card}
                            selected={selectedCard === card.id}
                            onSelect={() =>setSelectedCard(card.id)}
                        />
                    ))}
                </ScrollView>
            </Box>
            <Box marginTop="m">
                <Text
                    color="white"
                >
                    Delivery Address 
                </Text>
                <Box flexDirection="row" opacity={0.8}>
                    <Box flex={1} padding="s">
                        <Text color="white"> 
                            Unit 15 Apt Mediteratnia 8 70B
                        </Text>
                        <Text color="white"> 
                            Jakarta Timur Barat
                        </Text>
                    </Box>
                    <Box padding="s"
                        justifyContent="center" alignItems="center"
                    >
                        <Text color="white"> 
                            Change
                        </Text>
                    </Box>
                </Box>
                <LineItem 
                    label='Total Item'
                    value={189.94}
                />
                <LineItem 
                    label='Standard Delivery'
                    value={12}
                />
                <LineItem 
                    label='Total Payment'
                    value={201.94}
                />
            </Box>
            <Box 
                paddingVertical="s" 
                alignItems="center"
                flex={1}
                justifyContent="flex-end"
            >
                <Button 
                    variant='primary'
                    label='Transact'
                    onPress={() => console.log('1231')
                    }
                />
            </Box>
        </Box>
        
    </Box>
    </>
  );
}

export default CheckoutComponent;