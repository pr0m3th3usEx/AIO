import { Box } from '@chakra-ui/layout';

const Layout = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}): JSX.Element => {
  return <Box>{children}</Box>;
};

export default Layout;
