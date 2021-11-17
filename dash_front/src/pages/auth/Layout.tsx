import { Box, Heading, Text } from '@chakra-ui/layout';

const Layout = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}): JSX.Element => {
  return (
    <Box w="100%" h="100vh" bg="tiffany" overflowX="hidden" px="30px" py="20px">
      <Heading>
        <Text>Dashboard</Text>
      </Heading>
      {children}
    </Box>
  );
};

export default Layout;
