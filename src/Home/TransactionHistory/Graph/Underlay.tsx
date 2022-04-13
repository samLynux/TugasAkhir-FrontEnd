
import  React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text, theme } from '../../../components';
import { lerp } from './Helpers';
import moment from "moment"

// const formatter = (date: Date) => format(date, "MMM")

interface UnderlayProps {
    dates: number[];
    minY: number;
    maxY: number;
    minX: number;
    maxX: number;
    step: number;
 }
 


const Underlay = ({dates, minY, maxY, step, minX, maxX}: UnderlayProps) => {
    const numberOfMonths = 7
   const minDate = moment(minX);
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
                            <Box width={theme.spacing.l}
                                paddingRight="s"
                            >
                            <Text textAlign="right"
                            
                            >
                                {Math.round(lerp(minY, maxY, t))}
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
                .map((_, i) => minDate.clone().add(i,"month" ))
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