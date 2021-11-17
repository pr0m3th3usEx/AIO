import { Image } from '@chakra-ui/image';
import { HStack, VStack, Text, Box } from '@chakra-ui/layout';
import UnknownProfileImage from 'assets/UnknownProfileImage.jpg';
import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = (): JSX.Element => {
  const logout = (): void => {
    localStorage.clear();
    window.location.href = '/auth/login';
  };

  const goToProfile = (): void => {
    window.location.href = '/dashboard/profile';
  };

  return (
    <VStack
      position="absolute"
      bottom="-10px"
      bg="white"
      right="0"
      width="250px"
      borderRadius="6px"
      spacing={0}
      transform="translate(0, 100%)"
    >
      <Box
        w="100%"
        align="center"
        padding="18px 24px"
        cursor="pointer"
        _hover={{ opacity: '0.43' }}
        onClick={goToProfile}
      >
        <Text fontSize="18px" color="black">
          Profile / Services
        </Text>
      </Box>
      <Box bg="gray.light" h="1px" w="100%" />
      <Box
        w="100%"
        align="center"
        padding="18px 24px"
        cursor="pointer"
        _hover={{ opacity: '0.43' }}
        onClick={logout}
      >
        <Text fontSize="18px" color="black">
          Log out
        </Text>
      </Box>
    </VStack>
  );
};

const NavBar = (): JSX.Element => {
  const [menuDisplay, setMenuDisplay] = useState<boolean>(false);

  return (
    <HStack
      h="72px"
      w="100%"
      bg="tiffany"
      px="32px"
      py="12px"
      justifyContent="space-between"
    >
      <Link to="/dashboard">
        <Text fontWeight="bold" fontSize="24px">
          Dashboard
        </Text>
      </Link>
      <VStack position="relative">
        <Image
          onClick={() => setMenuDisplay(!menuDisplay)}
          cursor="pointer"
          w="48px"
          h="48px"
          borderRadius="50%"
          src={UnknownProfileImage}
          {...(menuDisplay && {
            boxShadow: `0px 0px 4px 4px rgba(240, 240, 240, 0.32)`,
          })}
        />
        {menuDisplay && <NavigationMenu />}
      </VStack>
    </HStack>
  );
};

export default NavBar;
