import  React, { useEffect, useState }  from 'react';
import {  ScrollView } from 'react-native';

import { Box, Text } from '../../components';
import CheckboxGroup from './CheckboxGroup';
import RoundedCheckboxGroup from '../../components/RoundedCheckboxGroup';
import axios from 'axios';


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
    "s",
    "m",
    "l",
    "xl",
    "xxl",
]

const colorOptions = [
    "black",
    "orange",
    "blue",
    "red",
    "purple",
]

const Configuration = () => {

    const [gender, setGender] = useState<string>("")
    const [size, setSize] = useState<string>("")
    const [colors, setColors] = useState<string[]>([])
    const [brands, setBrands] = useState<string[]>([])

    useEffect(() => {
        
        axios.post("users/updatepref",{
            brands,
            colors,
            size
        })
        .then((response) => {
            console.log(response.data);
        })
        
    },[gender, size, brands, colors])

  return (
    <>
    <ScrollView>
        <Box padding="m">
            <Text variant="body">
                What type of clothes do you wear
            </Text>
            <CheckboxGroup options={outfitType} radio
                onPress={(s) => {
                    setGender(s)
                    
                }}
            />

            <Text variant="body">
                What is your clothing size
            </Text>
            <RoundedCheckboxGroup options={sizes} radio
                onPress={(s) => {
                    setSize(s)
                    
                }}
            />

            <Text variant="body">
                What type of clothes do you wear
            </Text>
            <RoundedCheckboxGroup options={colorOptions} valueIsColor
                onPress={(s) => {
                    if(!colors.includes(s))
                        setColors([...colors, s])
                    else
                        setColors(colors.filter(c => c !== s))
                    
                }}
            />

            <Text variant="body">
                My preffered brands
            </Text>
            <CheckboxGroup options={prefferedBrands}
                onPress={(s) => {
                    if(!brands.includes(s))
                        setBrands([...brands, s])
                    else
                        setBrands(brands.filter(c => c !== s))
                    
                }}
            />

        </Box>
        
    </ScrollView>
    
    </>
  );
}

export default Configuration;