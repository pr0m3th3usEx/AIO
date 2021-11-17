import { Box, Heading, Text } from '@chakra-ui/layout';

const Layout = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}): JSX.Element => {
  return (
    <Box bg="tiffany" px="30px" py="20px" minH="100vh">
      <Heading>
        <Text>Dashboard</Text>
      </Heading>
      {children}
    </Box>
  );
};

export default Layout;
