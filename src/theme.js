import { extendTheme } from '@chakra-ui/react';

const theme = {
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
};

export default extendTheme(theme);
