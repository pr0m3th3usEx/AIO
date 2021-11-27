import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import Input from './components/input';
import Button from './components/button';
import Select from './components/select';

const breakpoints = createBreakpoints({
  sm: '576px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
});

const theme = extendTheme({
  colors: {
    tiffany: '#07BEB8',
    turquoise: {
      default: '#3DCCC7',
      light: '#68D8D6',
    },
    blizzard: '#9CEAEF',
    celeste: '#C4FFF9',
    gray: {
      default: '#cccccc',
      light: '#f0f0f0',
    },
  },
  fonts: {
    heading: 'Titillium Web',
    body: 'Titillium Web',
  },
  breakpoints,
  components: {
    Input,
    Button,
    Select,
  },
});

export default theme;
