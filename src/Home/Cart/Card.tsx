
import  React  from 'react';
import { Image, View } from 'react-native';
import { Text } from '../../components';
import CardLayout from './CardLayout';

export enum CardBrand{
    VISA,
    MASTERCARD
}

const visaLogo = require("../../../assets/debits/Visa.png");
const mastercardLogo = require("../../../assets/debits/Mastercard.png");

export interface CardModel{
    id: number;
    type: CardBrand;
    last4Digits: number;
    expiration: string;
}


interface CardProps{
    card: CardModel
    selected: boolean
    onSelect: () => void;
}




const Card = ({card, selected, onSelect}:CardProps) => {
  
  return (
    <>
    <CardLayout 
        onPress={onSelect}
        backgroundColor = {
                selected ? "primary" : "white"
        }
    >
        <View style={{height:20}}>
            <Image 
                style={card.type === CardBrand.VISA
                    ? {width: 39, height: 13}
                    : {width: 32.5, height: 20}
                }
                source={card.type === CardBrand.VISA
                    ? visaLogo
                    : mastercardLogo
                }
            />
        </View>
            <Text
                variant="title4"
                marginTop="s"
                marginBottom="s"
                color={ selected ? "white" : "black"}
            >
                **** {card.last4Digits}
            </Text>
            <Text
                opacity={0.5}
                color={ selected ? "white" : "black"}
            >
                Expiration
            </Text>
            <Text
                opacity={0.5}
                color={ selected ? "white" : "black"}
            >
                {card.expiration}
            </Text>
            
    </CardLayout>
    </>
  );
}

export default Card;