import { VStack } from '@chakra-ui/layout';
import NavBar from 'components/NavBar';

const Layout = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}): JSX.Element => {
  return (
    <VStack w="100%" minH="100vh" bg="gray.light">
      <NavBar />
      {children}
    </VStack>
  );
};

export default Layout;
