import  React, {  useState } from 'react';
import { Box, Button } from '../../components';


// const {width} = Dimensions.get("window")

interface CheckboxGroupProps{
  options: {
      value: string;
      label:string;
  }[];
  radio?: boolean;
  onPress?: (varX:string) => void;
}



const CheckboxGroup = ({ options, radio, onPress }: CheckboxGroupProps) => {
    const [selectedValues, setSelectedValues]= useState<string[]>([])
      
  return (
    <>
      <Box flexDirection="row" flexWrap="wrap" marginTop="s">
        {options.map(({label, value}) => {
            const index = selectedValues.indexOf(value)
            const isSelected = index !== -1
            return(
            <Button
                key={value}
                variant={
                    isSelected  
                        ? "primary" : "default"
                }
                label={label}
                style={{
                    width:"auto",
                    height:"auto",
                    padding:16,
                    marginVertical:8,
                    marginRight:4,
                }}
                onPress={() => {
                    if(onPress){
                        onPress(label.toLowerCase());
                      }
                    if(radio){
                        setSelectedValues([value]);
                    }else{
                        if(isSelected){
                            selectedValues.splice(index, 1)
                        } else{
                            selectedValues.push(value)
                        }
                        setSelectedValues([...selectedValues])
                    }
                    
                    
                    
                }}
            >

            </Button>
        )})}
      </Box>
    </>
  );
}

export default CheckboxGroup;