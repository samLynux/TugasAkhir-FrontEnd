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

interface ConfigurationProps{
    timedOut: () => void;
}

const Configuration = ({timedOut}: ConfigurationProps ) => {

    const [gender, setGender] = useState<string>("n")
    const [size, setSize] = useState<string>("")
    const [colors, setColors] = useState<string[]>([])
    const [brands, setBrands] = useState<string[]>([])

    useEffect(() => {
        
        if(gender === "n" &&
            size === "" &&
            colors.length <= 0 &&
            brands.length <= 0
        ){
            axios.get("users/me")
            .then((result) => {
                setGender(result.data.gender);
                setSize(result.data.size.value);
                setColors(result.data.colors.map((i: any) => i.value));
                setBrands(result.data.brands.map((i: any) => i.value));
                
            }).catch(err => {
                if(err.response.data.statusCode === 403){
                    timedOut();
                }
            })
            
            
            return;
        }
        
        

        axios.post("users/updatepref",{
            gender,
            brands,
            colors,
            size
        }).catch(err => {
            if(err.response.data.statusCode === 403){
                timedOut();
            }
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
                defaults={[gender]}
                onPress={(s) => {
                    setGender(s)
                    
                }}
            />

            <Text variant="body">
                What is your clothing size
            </Text>
            <RoundedCheckboxGroup options={sizes} radio
                defaults={[size]}
                onPress={(s) => {
                    setSize(s)
                    
                }}
            />

            <Text variant="body">
                What color of clothes do you like?
            </Text>
            <RoundedCheckboxGroup options={colorOptions} valueIsColor
                defaults={colors}
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
                defaults={brands}
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