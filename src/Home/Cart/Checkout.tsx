
import  React, { useContext } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, Button, Text } from '../../components';
import LineItem from '../../components/LineItem';
import { UserContext } from '../services/user.context';


interface CheckoutComponentProps{
    minHeight: number;
    total: number;
    onCheckout: () => void;
    onChangeAddress: () => void;
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
                <Box flexDirection="row" opacity={0.8} paddingBottom="m">
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
                    value={"$"+ total.toString()}
                />
                <LineItem 
                    label='Standard Delivery'
                    value={"$"+deliveryCost.toString()}
                />
                <LineItem 
                    label='Total Payment'
                    value={"$"+(total + deliveryCost).toString()}
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