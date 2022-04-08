import  React from 'react';

import { Feather as Icon } from '@expo/vector-icons';

import { RectButton } from 'react-native-gesture-handler';

interface OutfitIdeasProps {
    onPress: () => void;
}


const OutfitIdeas = ({ onPress}: OutfitIdeasProps) => {
    


  return (
    <>
    <RectButton {...{onPress}} >
      
    </RectButton>
    </>
  );
}

export default OutfitIdeas;