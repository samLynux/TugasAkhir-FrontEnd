import { format } from 'date-fns';
import  React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text, theme } from '../../../components';
import { lerp } from './Helpers';


const formatter = (date: Date) => format(date, "MMM")

interface UnderlayProps {
    dates: number[];
    minY: number;
    maxY: number;
    step: number;
 }
 


const Underlay = ({dates, minY, maxY, step}: UnderlayProps) => {
   
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
                dates.map((date, index) => (
                    <Box width={step}>
                        <Text key={index} textAlign="center">
                            {formatter(new Date(date))}
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