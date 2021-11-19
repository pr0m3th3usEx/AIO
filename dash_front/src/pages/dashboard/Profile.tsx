import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import {
  Box,
  Stack,
  VStack,
  HStack,
  Text,
  StackDivider,
} from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Switch } from '@chakra-ui/switch';
import UnknownProfileImage from 'assets/UnknownProfileImage.jpg';
import { FC } from 'react';

const ProfileCard = (): JSX.Element => {
  const screenSize = useBreakpointValue({ base: 'SM', md: 'MD' }) || 'MD';

  return (
    <VStack
      w={screenSize === 'SM' ? '100%' : '50%'}
      padding={{ base: '0px', md: '12px', lg: '24px' }}
      spacing="48px"
    >
      <VStack spacing="18px">
        <Image
          borderRadius="50%"
          src={UnknownProfileImage}
          w={{ base: '90px', md: '128px', lg: '160px' }}
        />
        <Text color="black" fontWeight="bold">
          Username
        </Text>
        <Text color="gray">Email</Text>
      </VStack>

      <VStack spacing="24px" align="start" w="100%">
        <Text color="black" fontWeight="bold" fontSize="24px">
          Password settings
        </Text>

        <form style={{ width: '100%' }}>
          <VStack spacing="12px" w="100%" align="start" variant="dark">
            <Input
              placeholder="Enter current password"
              variant="light"
              type="password"
            />
            <Input
              placeholder="Enter new password"
              variant="light"
              type="password"
            />
            <Input
              placeholder="Confirm new password"
              variant="light"
              type="password"
            />
            <Button type="submit" variant="light" fontWeight="bold">
              Save new password
            </Button>
          </VStack>
        </form>
      </VStack>
    </VStack>
  );
};

const ServiceActivator = (): JSX.Element => {
  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      alignItems="baseline"
      h="24px"
    >
      <Text color="black" fontSize="18px">
        Google
      </Text>
      <Switch size="lg" color="#3DCCC7" colorScheme="blue"></Switch>
    </HStack>
  );
};

const Profile: FC = (): JSX.Element => {
  const screenSize = useBreakpointValue({ base: 'SM', md: 'MD' }) || 'MD';

  return (
    <VStack
      align="start"
      w="100%"
      px={{ base: '24px', md: '48px', lg: '64px' }}
      py={{ base: '32px', md: '48px', lg: '64px' }}
    >
      <Text color="black" fontSize={{ base: '24px', md: '32px', lg: '48px' }}>
        Profile
      </Text>

      <Stack
        w="100%"
        spacing={{ base: '24px', md: '48px', lg: '64px' }}
        divider={<StackDivider borderColor="gray.200" borderWidth="2px" />}
        direction={screenSize === 'SM' ? 'column' : 'row'}
      >
        <ProfileCard />
        <VStack
          w={screenSize === 'SM' ? '100%' : '50%'}
          padding={{ base: '0px', md: '12px', lg: '24px' }}
          spacing="48px"
        >
          <Text color="black" fontSize="24px" fontWeight="bold">
            Services
          </Text>

          <VStack w="100%" spacing={{ base: '32px', md: '34px', lg: '36px' }}>
            <ServiceActivator />
            <ServiceActivator />
            <ServiceActivator />
            <ServiceActivator />
            <ServiceActivator />
            <ServiceActivator />
          </VStack>
        </VStack>
      </Stack>
    </VStack>
  );
};

export default Profile;
