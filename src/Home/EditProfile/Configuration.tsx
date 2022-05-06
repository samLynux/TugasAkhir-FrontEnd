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
        value: "m",
        label: "For Men"
    },
    {
        value: "f",
        label: "For Women"
    },
    {
        value: "n",
        label: "For both"
    },
]

const prefferedBrands = [
    {value: "adidas",   label: "Adidas"},
    {value: "nike",   label: "Nike"},
    {value: "pull&bear",   label: "Pull & Bear"},
    {value: "h&m",   label: "H & M"},
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
    "white",
    "red",
    "blue",
    "green",
]

const Configuration = () => {

    const [gender, setGender] = useState<string>("n")
    const [size, setSize] = useState<string>("")
    const [colors, setColors] = useState<string[]>([])
    const [brands, setBrands] = useState<string[]>([])

    useEffect(() => {
        
        // axios.get("users/me")
        //     .then((result) => {
        //         console.log(result.data);
        //         setGender(result.data.gender);
        //         setSize(result.data.size);
        //         setColors(result.data.colors);
        //         setBrands(result.data.brands);
                
        //     })
        
    },[gender, size, brands, colors])

    const setPref = () => {
        axios.post("users/updatepref",{
            gender,
            brands,
            colors,
            size
        })
    }
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