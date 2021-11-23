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
import { useToast } from '@chakra-ui/toast';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import UnknownProfileImage from 'assets/UnknownProfileImage.jpg';
import { MinLength } from 'class-validator';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PasswordChangeDto, useChangePasswordMutation } from 'services/user';
import { useAppSelector } from 'utils/hooks';
import { Match } from 'utils/validation/match.decorator';

class ChangePasswordFields {
  @MinLength(8, { message: 'Password is too short (min. 8 characters)\n' })
  currentPassword: string;
  @MinLength(8, { message: 'Password is too short (min. 8 characters)\n' })
  newPassword: string;
  @Match('newPassword', {
    message: 'Password does not match\n',
  })
  confirmNewPassword: string;
}

const resolver = classValidatorResolver(ChangePasswordFields);

const ProfileCard = (): JSX.Element => {
  const { user } = useAppSelector((state) => state);
  const screenSize = useBreakpointValue({ base: 'SM', md: 'MD' }) || 'MD';
  const toast = useToast();
  const [changePassword, { data, isLoading, isSuccess, isError, error }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: fieldErrors },
  } = useForm<ChangePasswordFields>({ resolver });
  const onFormSubmit = (data: ChangePasswordFields) => {
    const dto: PasswordChangeDto = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    changePassword(dto);
  };

  useEffect(() => {
    if (Object.keys(fieldErrors).length > 0) {
      toast({
        title: 'Incorrect fields',
        description: `
          ${
            fieldErrors.currentPassword?.message ||
            fieldErrors.newPassword?.message ||
            fieldErrors.confirmNewPassword?.message ||
            ''
          }
        `,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [fieldErrors, toast]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      reset();
      toast({
        title: 'Password changed',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } else if (!isLoading && isError && error) {
      console.log(error);
      toast({
        title: 'Error',
        status: 'error',
        description: "Couldn't change password! Try again!",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [reset, toast, isLoading, isSuccess, isError, error]);

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
          {user.username}
        </Text>
        <Text color="gray">{user.email}</Text>
      </VStack>

      <VStack spacing="24px" align="start" w="100%">
        <Text color="black" fontWeight="bold" fontSize="24px">
          Password settings
        </Text>

        <form style={{ width: '100%' }} onSubmit={handleSubmit(onFormSubmit)}>
          <VStack spacing="12px" w="100%" align="start" variant="dark">
            <Input
              placeholder="Enter current password"
              variant="light"
              type="password"
              {...register('currentPassword', { required: true })}
            />
            <Input
              placeholder="Enter new password"
              variant="light"
              type="password"
              {...register('newPassword', { required: true })}
            />
            <Input
              placeholder="Confirm new password"
              variant="light"
              type="password"
              {...register('confirmNewPassword', {
                required: true,
                minLength: 8,
              })}
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
