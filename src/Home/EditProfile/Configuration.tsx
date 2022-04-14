import  React  from 'react';
import {  ScrollView } from 'react-native';

import { Box, Text } from '../../components';
import CheckboxGroup from './CheckboxGroup';
import RoundedCheckbox from './RoundedCheckboxGroup';


// const {width} = Dimensions.get("window")

// interface ConfigurationProps{
//   children: ReactNode;
// }

const outfitType = [
    {
        value: "men",
        label: "For Men"
    },
    {
        value: "women",
        label: "For Women"
    },
    {
        value: "both",
        label: "For both"
    },
]

const prefferedBrands = [
    {value: "adidas",   label: "Adidas"},
    {value: "nike",   label: "Nike"},
    {value: "converse",   label: "Converse"},
    {value: "tommy-hilfiger",   label: "Tommy Hilfiger"},
    {value: "billionaire-boys-club",   label: "Billionaire Boys Club"},
    {value: "jordan",   label: "Jordan"},
    {value: "le-coq-sportif",   label: "Le Coq Sportif"},
]

const sizes = [
    {value: "s"},
    {value: "m"},
    {value: "l"},
    {value: "xl"},
    {value: "xxl"},
]

const colors = [
    {value: "#0C0D34"},
    {value: "#FF0058"},
    {value: "#50B9DE"},
    {value: "#00D99A"},
    {value: "#FE5E33"},
]

const Configuration = () => {
    
      
  return (
    <>
    <ScrollView>
        <Box padding="m">
            <Text variant="body">
                What type of clothes do you wear
            </Text>
            <CheckboxGroup options={outfitType} radio/>

            <Text variant="body">
                What is your clothing size
            </Text>
            <RoundedCheckbox options={sizes}/>

            <Text variant="body">
                What type of clothes do you wear
            </Text>
            <RoundedCheckbox options={colors} valueIsColor/>

            <Text variant="body">
                My preffered brands
            </Text>
            <CheckboxGroup options={prefferedBrands}/>

        </Box>
        
    </ScrollView>
    
    </>
  );
}

export default Configuration;