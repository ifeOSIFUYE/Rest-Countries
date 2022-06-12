import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon } from '@chakra-ui/icons';
import { Outlet } from 'react-router-dom';

const Aside = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <Box as="aside">
        <Container maxW="container.xl" py={5}>
          <Flex align="center" justify="space-between">
            <Heading size={['xs', 'md']}>Where in the world?</Heading>
            <Button
              variant="ghost"
              leftIcon={<MoonIcon />}
              size="xs"
              onClick={toggleColorMode}
            >
              Dark Mode
            </Button>
          </Flex>
        </Container>
        <Divider />
      </Box>
      <Outlet />
    </>
  );
};

export default Aside;
