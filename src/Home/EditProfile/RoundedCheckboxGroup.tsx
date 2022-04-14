import  React, {  useState } from 'react';
import { View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, Text, theme } from '../../components';
import {Feather as Icon} from "@expo/vector-icons"

// const {width} = Dimensions.get("window")

interface RoundedCheckboxProps{
  options: {
      value: string;
  }[];
  valueIsColor?: boolean
}



const RoundedCheckbox = ({ options, valueIsColor }: RoundedCheckboxProps) => {
    const [selectedValues, setSelectedValues]= useState<string[]>([])
      
  return (
    <>
      <Box flexDirection="row" flexWrap="wrap" marginTop="s">
        {options.map(({value}) => {
            const index = selectedValues.indexOf(value)
            const isSelected = index !== -1
            const backgroundColor = isSelected ? theme.colors.primary : theme.colors.default
            return(
            <BorderlessButton
                key={value}
                onPress={() => {
                    if(isSelected){
                        selectedValues.splice(index, 1)
                    } else{
                        selectedValues.push(value)
                    }
                    setSelectedValues([...selectedValues])
                }}
            >
              <View
                style={{
                  width:50,
                  height:50,
                  borderRadius:25,
                  justifyContent:"center",
                  alignItems:"center",
                  borderWidth: isSelected ? 1: 0,
                  borderColor: "black",
                  marginBottom:8,
                  marginRight:4,
                }}
              >
              <View style={{
                width: 40,
                height:40,
                borderRadius:30,
                justifyContent:"center",
                alignItems:"center",
                backgroundColor: valueIsColor ? value : backgroundColor
              }}>
                {!valueIsColor &&(
                  <Text 
                    textAlign='center' 
                    variant="header"
                    color={isSelected ? "white" : "black"}
                  >
                    {value.toUpperCase()}
                  </Text>
                )}
                {valueIsColor && isSelected &&(
                  <>
                  <Icon color="white" name='check' size={16}/>
                  </>
                )}
                
              </View>
              </View>
            </BorderlessButton>
        )})}
      </Box>
    </>
  );
}

export default RoundedCheckbox;