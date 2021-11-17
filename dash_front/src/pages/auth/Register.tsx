import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Length, IsEmail, MinLength } from 'class-validator';
import { Match } from 'utils/validation/match.decorator';
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout';
import { Input, Button, useToast } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

class UserRegistrationFields {
  @Length(4, 30, {
    message: 'Username should contain between 4 and 30 characters\n',
  })
  username: string;

  @IsEmail({}, { message: 'E-mail format is not valid' })
  email: string;

  @MinLength(8, {
    message: 'Password is too short (min. 8 characters)\n',
  })
  password: string;

  @Match('password', {
    message: 'Password does not match\n',
  })
  rePassword: string;
}

const resolver = classValidatorResolver(UserRegistrationFields);

const Register: FC = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserRegistrationFields>({ resolver });

  const toast = useToast();

  const onSubmit = handleSubmit((data: UserRegistrationFields) => {
    console.log(data);
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast({
        title: 'Incorrect fields',
        description: `
          ${
            errors.username?.message ||
            errors.email?.message ||
            errors.password?.message ||
            errors.rePassword?.message ||
            ''
          }
        `,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [errors, toast]);

  return (
    <Center minH="80vh" overflowX="hidden">
      <VStack spacing="48px" w="500px">
        <Text as="h1" fontSize="32px">
          Sign up
        </Text>

        <form onSubmit={onSubmit}>
          <VStack spacing="24px" w="100%">
            <Input
              placeholder="Username"
              type="text"
              isInvalid={!!errors.username}
              {...register('username', { required: true })}
            />
            <Input
              placeholder="E-mail address"
              type="email"
              isInvalid={!!errors.email}
              {...register('email', { required: true })}
            />
            <Input
              placeholder="Password"
              type="password"
              isInvalid={!!errors.password}
              {...register('password', { required: true })}
            />
            <Input
              placeholder="Confirmation password"
              type="password"
              isInvalid={!!errors.rePassword}
              {...register('rePassword', { required: true })}
            />
            <HStack justifyContent="space-between" width="100%">
              <Box>
                <Link to="/auth/login">
                  <Text _hover={{ fontDecoration: 'underline' }}>
                    Already registered ? Connect to your dashboard now !
                  </Text>
                </Link>
              </Box>
              <Button fontWeight="bold" type="submit">
                Sign up
              </Button>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Center>
  );
};

export default Register;
