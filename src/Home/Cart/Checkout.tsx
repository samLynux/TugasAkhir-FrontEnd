
import  React, { useContext } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, Button, Text } from '../../components';
import { UserContext } from '../services/user.context';


interface CheckoutComponentProps{
    minHeight: number;
    total: number;
    onCheckout: () => void;
    onChangeAddress: () => void;
}



// const cards = [
//     {
//         id: 0,
//         type: CardBrand.VISA,
//         last4Digits: 5467,
//         expiration: "05/24"
//     },
//     {
//         id: 1,
//         type: CardBrand.MASTERCARD,
//         last4Digits: 7575,
//         expiration: "11/22"
//     },
//     {
//         id: 2,
//         type: CardBrand.VISA,
//         last4Digits: 9127,
//         expiration: "12/25"
//     },
//     {
//         id: 3,
//         type: CardBrand.MASTERCARD,
//         last4Digits: 2579,
//         expiration: "01/21"
//     },
//     {
//         id: 4,
//         type: CardBrand.VISA,
//         last4Digits: 6567,
//         expiration: "03/22"
//     },
// ]

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
const deliveryCost = 12;

const CheckoutComponent = ({minHeight, total, onCheckout, onChangeAddress}:CheckoutComponentProps) => {
    // const [selectedCard, setSelectedCard] = useState(cards[0].id) 
    // @ts-ignore
    const [[user] ]= useContext(UserContext);
    
    
    
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
            {/* <Box height={CARD_HEIGHT}>
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
            </Box> */}
            <Box marginTop="m">
                <Text
                    color="white"
                >
                    Delivery Address 
                </Text>
                <Box flexDirection="row" opacity={0.8}>
                    <Box flex={1} padding="s">
                        <Text color="white"> 
                            {(user && user.address) ?
                                (user.address ):
                                "Address not inputed yet"
                            }
                        </Text>
                    </Box>
                    <Box padding="s"
                        justifyContent="center" alignItems="center"
                    >
                        <BorderlessButton onPress={() => onChangeAddress()}>
                            <Text color="white">Change</Text>
                        </BorderlessButton>
                    </Box>
                </Box>
                <LineItem 
                    label='Total Item'
                    value={total}
                />
                <LineItem 
                    label='Standard Delivery'
                    value={deliveryCost}
                />
                <LineItem 
                    label='Total Payment'
                    value={total + deliveryCost}
                />
            </Box>
            <Box 
                paddingVertical="s" 
                alignItems="center"
                flex={1}
                justifyContent="flex-end"
            >
                {(user && user.address) ?
                    (<Button 
                        variant='primary'
                        label='Transact'
                        onPress={onCheckout}
                    /> ):
                    <Text>Please Input Your Address First</Text>
                }
                
            </Box>
        </Box>
        
    </Box>
    </>
  );
}

export default CheckoutComponent;