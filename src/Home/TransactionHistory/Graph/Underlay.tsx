
import  React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text, theme } from '../../../components';
import { lerp } from './Helpers';
import moment from "moment"

// const formatter = (date: Date) => format(date, "MMM")

interface UnderlayProps {
    minY: number;
    maxY: number;
    minX: number;
    step: number;
    numberOfMonths: number;
 }
 


const Underlay = ({ minY, maxY, step, minX, numberOfMonths}: UnderlayProps) => {

   const minDate = moment(minX);
//    console.log(moment(minDate).format());
  return (
    <>
    <Box 
        style={StyleSheet.absoluteFill}
    >
        <Box flex={1} justifyContent="space-between">
            {
                [1, 0.66, 0.33, 0].map((t) => {
                    return (
                        <Box 
                            key={t} 
                            flexDirection="row"
                            alignItems="center"
                            style={{
                                zIndex: 999,
                                top: t === 0 ? 8 :
                                     t === 1 ? -8 : 0
                            }}
                        >
                            <Box width={theme.spacing.xl}
                                paddingRight="s"
                            >
                            <Text textAlign="right"
                                fontSize={10}
                            >
                                {Math.round(lerp(minY, maxY , t) ) }
                            </Text>
                            </Box>
                            <Box flex={1} height={1} backgroundColor="black"/>
                            
                        </Box>
                    )
                })
            }
        </Box>
        <Box
            marginLeft="l"
            height={theme.spacing.l}
            flexDirection="row"
            alignItems="baseline"
        >
            {
                new Array(numberOfMonths)
                .fill(0)
                .map((_, i) => minDate.clone().add(i+1,"month" ))
                .map((date, index) => (
                    <Box width={step}  key={index}>
                        <Text textAlign="center">
                            {date.format("MMM")}
                        </Text>
                    </Box>
                ))
            }

        </Box>
    </Box>
    </>
  );
}

export default Underlay;