import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { mono: '\'Menlo\', monospace' };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const colors = {
  primary: {
    50: '#ebffdf',
    100: '#caffb1',
    200: '#a5ff80',
    300: '#8dff4f',
    400: '#7dff21',
    500: '#73e60c',
    600: '#64b304',
    700: '#508000',
    800: '#324d00',
    900: '#0e1b00',
  },
  secondary: {
    50: '#ddffec',
    100: '#b5f8d5',
    200: '#8af2be',
    300: '#5deba9',
    400: '#33e698',
    500: '#19cc84',
    600: '#0d9f5d',
    700: '#02713a',
    800: '#00451d',
    900: '#001905',
  },
  tertiary: {
    50: '#dcf5ff',
    100: '#b4e6fb',
    200: '#88dbf7',
    300: '#5cd2f2',
    400: '#39ccef',
    500: '#27bad5',
    600: '#1895a6',
    700: '#086e77',
    800: '#003e48',
    900: '#00141b',
  },
  quaternary: {
    50: '#e6e6ff',
    100: '#b9baf9',
    200: '#8c90f2',
    300: '#5e69ed',
    400: '#3445e8',
    500: '#1e32cf',
    600: '#162ba1',
    700: '#0f2273',
    800: '#061646',
    900: '#00051b',
  },
};

const theme = extendTheme({
  colors,
  fonts,
  breakpoints,
});

export default theme;
