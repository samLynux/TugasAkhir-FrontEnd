import moment from 'moment';
import  React   from 'react';
import { Dimensions, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming,  } from 'react-native-reanimated';
import { Box, theme } from '../../../components';
import { lerp } from './Helpers';
import Underlay from './Underlay';

const aspectRatio = 305/195
const AnimatedBox = Animated.createAnimatedComponent(Box)

const {width: wWidth} = Dimensions.get("window")



export interface DataPoint{
    date: number,
    total:number
}

interface GraphProps {
   data: DataPoint[];
   maxDate: number
}


const Graph = ({data, maxDate}: GraphProps) => {
    
    const minDate = moment(maxDate).subtract(6, "month");

    const numberOfMonths = 6
    //@ts-ignore
    const canvasWidth = wWidth - theme.spacing.m * 2
    const canvasHeight = canvasWidth / aspectRatio;
    const width = canvasWidth - 24;
    const height = canvasHeight - 24
    const values = data.map(p => p.total)
    // const dates = data.map(p => p.date)
    const step = width /numberOfMonths
    //@ts-ignore
    const minX = new Date(minDate).getTime()
    
    
    // const maxX = Math.max(...dates);
    const minY = 0;
    const maxY = Math.ceil(Math.max(...values) /100) * 100;
  return (
    <>
    <Box 
        marginTop="xl"
        paddingBottom="xl"
        paddingLeft="l"
        flexDirection="row"
        backgroundColor="light_blue"
    >
        <Underlay 
            minY={minY} 
            maxY={maxY} 
            minX={minX} 
            step={step}
            numberOfMonths={numberOfMonths}
        />
        <View
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
                ) - 1
                
                if(point.total === 0){
                    return null
                }
                
                const tranlateY = useSharedValue(0)
                const h = useSharedValue(0);
                const style = useAnimatedStyle(() => ({
                    height: h.value,
                    transform: [{translateX: tranlateY.value}],
                }))
                const totalHeight = lerp(0, height, point.total/maxY);

                h.value = withTiming(totalHeight,
                    {duration: 500}, 
                );
                return (
                    <AnimatedBox
                        key={point.date}
                        position="absolute"
                        width={step}
                        height={totalHeight}
                        left={i * step}
                        bottom={0}
                        style={style}
                        // backgroundColor="primary"
                        
                    >
                        <Box 
                            backgroundColor= "black" //@ts-ignore
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
                            backgroundColor="black"//@ts-ignore
                            borderRadius="m" 
                            position="absolute"
                            top={0}
                            height={32}
                            left={ theme.spacing.m}
                            right={ theme.spacing.m}
                        />
                    </AnimatedBox>
                )
            })}
            
        </View>
    </Box>
    </> 
  );
}

export default Graph;