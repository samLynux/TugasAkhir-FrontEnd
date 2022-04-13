import { BaseTheme, createBox, createText, createTheme } from '@shopify/restyle';

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
    light_green: '#42f5bf',
    leaf_green: '#42f54b',
    yellow: '#e6f542',
    pink: '#f542a7',
    light_blue: "#a9a6ff",
    dark_blue: "#02004a"
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
