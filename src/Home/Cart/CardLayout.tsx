import  React  from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Box } from '../../components';


export const CARD_HEIGHT = 120;

interface CardLayoutProps{
    children: React.ReactNode;
    onPress: () => void;
    backgroundColor: string;
}




const CardLayout = ({onPress, children,backgroundColor}:CardLayoutProps) => {
  
  return (
    <>
    <RectButton onPress={onPress}>
        <Box 
            padding="s"
            marginLeft="m" //@ts-ignore
            borderRadius="m"
            width={80} 
            height={CARD_HEIGHT}
            backgroundColor={backgroundColor}
        >
            {children}
            
        </Box>
    </RectButton>
    </>
  );
}

export default CardLayout;