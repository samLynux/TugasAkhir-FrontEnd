import moment from 'moment';
import  React, { useLayoutEffect, useRef }  from 'react';
import { Dimensions } from 'react-native';
import { Transition, Transitioning, TransitioningView } from 'react-native-reanimated';

import { Box, theme } from '../../../components';
import { Theme } from '../../../components/Theme';
import { lerp } from './Helpers';
import Underlay from './Underlay';

const aspectRatio = 305/195
const transition = (
    <Transition.Together>
        
        <Transition.In type="slide-bottom" durationMs={650} interpolation="easeInOut"/>
    </Transition.Together>
)
const {width: wWidth} = Dimensions.get("window")



export interface DataPoint{
    date: number,
    value:number,
    color: keyof Theme["colors"];
    id: number;
}

interface GraphProps {
   data: DataPoint[];
   minDate: number;
   maxDate: number
}


const Graph = ({data, minDate, maxDate}: GraphProps) => {
    const ref = useRef< TransitioningView>(null)
    useLayoutEffect(() => {
        ref.current?.animateNextTransition();
    }, [])
    const numberOfMonths = new Date(maxDate - minDate).getMonth();
    //@ts-ignore
    const canvasWidth = wWidth - theme.spacing.m * 2
    const canvasHeight = canvasWidth / aspectRatio;
    const width = canvasWidth - 24;
    const height = canvasHeight - 24
    const values = data.map(p => p.value)
    const dates = data.map(p => p.date)
    const step = width /numberOfMonths
    const minX = Math.min(...dates);
    // const maxX = Math.max(...dates);
    const minY = Math.min(...values);
    const maxY = Math.max(...values);
  return (
    <>
    <Box 
        marginTop="xl"
        paddingBottom="xl"
        paddingLeft="l"
        flexDirection="row"
    >
        <Underlay 
            minY={minY} 
            maxY={maxY} 
            minX={minX} 
            step={step}
            numberOfMonths={numberOfMonths}
        />
        <Transitioning.View 
            transition={transition}
            ref={ref}
            style={{
                width,
                height,
                overflow: "hidden"
            }}
            
        >
        
            { data.map((point) => {
                const i = Math.round(
                    moment.duration(
                        moment(point.date).diff(moment(minDate))
                    ).asMonths()
                )
                
                if(point.value === 0){
                    return null
                }
                
                return (
                    <Box
                        key={point.id}
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
            
        </Transitioning.View>
    </Box>
    </>
  );
}

export default Graph;