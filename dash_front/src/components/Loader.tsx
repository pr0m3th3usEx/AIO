import { Box, Spinner } from '@chakra-ui/react';

const Loader = (): JSX.Element => (
  <Box
    pos="fixed"
    h="100%"
    w="100%"
    bg="#c0c0c0e0"
    top="0"
    left="0"
    zIndex={101}
  >
    <Box pos="relative" h="100%" w="100%">
      <Box
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Spinner size="xl" color="turquoise" thickness="4px" />
      </Box>
    </Box>
  </Box>
);

export default Loader;
