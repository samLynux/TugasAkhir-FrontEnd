import  React  from 'react';
import { Dimensions } from 'react-native';

import { Box, theme } from '../../components';
import { Theme } from '../../components/Theme';

const aspectRatio = 305/195
const {width: wWidth} = Dimensions.get("window")
const lerp = (v0:number, v1:number, t:number) => {
    return (1-t) * v0 + t * v1
}


export interface DataPoint{
    date: number,
    value:number,
    color: keyof Theme["colors"];
}

interface GraphProps {
   data: DataPoint[]
}


const Graph = ({data}: GraphProps) => {
    
    //@ts-ignore
    const width = wWidth - theme.spacing.m * 2
    const height = width / aspectRatio;
    const values = data.map(p => p.value)
    const dates = data.map(p => p.date)
    const step = width /data.length
    const minX = Math.min(...dates);
    const maxX = Math.max(...dates);
    const minY = Math.min(...values);
    const maxY = Math.max(...values);
  return (
    <>
        <Box   
            width={width}
            height={height}
            marginTop="xl"
        >
            { data.map((point, i) => {
                if(point.value === 0){
                    return null
                }
                
                return (
                    <Box
                        key={point.date}
                        position="absolute"
                        width={step}
                        height={lerp(0, height, point.value/maxY)}
                        left={i * step}
                        bottom={0}
                        // backgroundColor="primary"
                        
                    >
                        <Box 
                            backgroundColor= {point.color} //@ts-ignore
                            borderTopLeftRadius="m" //@ts-ignore
                            borderTopRightRadius= "m"
                            position="absolute"
                            top={0}
                            bottom={0}
                            left={ theme.spacing.m}
                            right={ theme.spacing.m}
                            opacity={0.1}
                        />
                        <Box 
                            backgroundColor={point.color}//@ts-ignore
                            borderRadius="m" 
                            position="absolute"
                            top={0}
                            height={32}
                            left={ theme.spacing.m}
                            right={ theme.spacing.m}
                        />
                    </Box>
                )
            })}
            
        </Box>
    </>
  );
}

export default Graph;