import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'rgb(26 32 44)' : '#ffffff',
        color: props.colorMode === 'dark' ? '#ffffff' : 'rgb(26 32 44)',
      },
    }),
  },
});

export default theme;
