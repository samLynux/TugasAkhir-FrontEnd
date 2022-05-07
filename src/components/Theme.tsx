import { BaseTheme, createBox, createText, createTheme } from '@shopify/restyle';
import { Dimensions } from 'react-native';

export const {width} = Dimensions.get("window");
  
export const aspectRatio = width/375;


const palette = {
  // purpleLight: '#8C6FF7',
  // purplePrimary: '#5A31F4',
  // purpleDark: '#3F22AB',

  // greenLight: '#56DCBA',
  // greenPrimary: '#0ECD9D',
  // greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme: BaseTheme = createTheme({

  colors: {
    black: '#0B0B0B',
    white: palette.white,
    body: 'rgba(12,13,52,0.7)',
    primary: '#2CB9B0',
    title: '#0C0D34',
    secondary: '#4287f5',
    red: "#ff0004",
    brown: "#A52A2A",
    light_green: '#42f5bf',
    leaf_green: '#42f54b',
    dark_green: '#013220',
    yellow: '#e6f542',
    pink: '#f542a7',
    blue: "#4b39e6",
    light_blue: "#BFEAF5",
    ice_blue: "#78f6fa",
    dark_blue: "#0600bd",
    green: "#5eff81",
    purple: "#ff5ec9",
    pink_orange: "#f78686",
    grey: "#bababa",
    orange: "#ff8000",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 50,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 40,
    xxl: 75,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      fontFamily: 'SFProDis-Bold',
      color: 'white',
      textAlign: 'center',
    },
    title1: {
      fontSize: 28,
      fontFamily: 'SFProDis-Semibold',
      color: 'title',
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: 'SFProDis-Semibold',
      color: 'title',
    },
    title3: {
      fontSize: 16,
      lineHeight: 30,
      fontFamily: 'SFProDis-Semibold',
      color: 'title',
    },
    title4: {
      fontSize: 8,
      lineHeight: 30,
      fontFamily: 'SFProDis-Semibold',
      color: 'title',
    },
    body: {
      fontSize: 16,
      lineHeight: 25,
      fontFamily: 'SFProDis-Regular',
      color: 'body',
    },
    header: {
      fontSize: 12,
      lineHeight: 24,
      fontFamily: 'SFProDis-Semibold',
      color: 'black',
    },
  },
  breakpoints: {},
});

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export default theme;
