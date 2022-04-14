import  React, { Children, ReactNode, useState } from 'react';
import {  Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, { multiply } from 'react-native-reanimated';
import { mix, useTransition } from 'react-native-redash';
import { Box, Text, theme } from '../../components';


const {width} = Dimensions.get("window")
export interface Tab{
    id: string;
    label: string;
  }

interface TabsProps{
  tabs: Tab[]
  children: ReactNode;
}



const Tabs = ({ tabs, children }: TabsProps) => {
    const [tabIndex, setTabIndex] = useState(0)
    const selectedTab = tabs[tabIndex]
    const transition = useTransition(tabIndex);
    const translateX = mix(transition, width * 0.25, width * 0.75)

      
  return (
    <>
    <Box flex={1}>
      <Box flexDirection='row'>
        {tabs.map((tab, index) => (
            <RectButton
                key={index}
                style={{flex:1}}
                onPress={() => setTabIndex(index)}
            >
                <Box 
                    padding="m"
                    paddingBottom="xl"
                >
                    <Text
                        variant="title3"
                        textAlign="center"
                    >
                        {tab.label}
                    </Text>
                </Box>
            </RectButton>
        ))}
        <Animated.View 
            style={{
                position:"absolute",
                bottom: 0,
                left: -5,
                backgroundColor: theme.colors.primary,
                width: 10,
                height: 10,
                borderRadius: 5,
                transform: [{
                    translateX
                }]
            }}
        />
      </Box>
      <Animated.View
        style={{
          flex:1,
          width:width * tabs.length,
          flexDirection:"row",
          transform: [{
            translateX: multiply(-width, transition)
          }]
        }}
      >
        {Children.map(children,(child, index) => (
          <Box
            flex={1}
            key={index}
          >
            {child}
          </Box>
        ))}
      </Animated.View>
    </Box>
    </>
  );
}

export default Tabs;