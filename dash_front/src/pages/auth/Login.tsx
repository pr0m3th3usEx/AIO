import { Box, Text, VStack, HStack } from '@chakra-ui/layout';
import { Button, Input, useToast } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { IsEmail, MinLength } from 'class-validator';
import { useForm } from 'react-hook-form';

class UserLoginField {
  @IsEmail({}, { message: 'E-mail format is not valid' })
  email: string;

  @MinLength(8, {
    message: 'Password is too short (min. 8 characters)\n',
  })
  password: string;
}

const resolver = classValidatorResolver(UserLoginField);

const Login: FC = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserLoginField>({ resolver });

  const toast = useToast();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast({
        title: 'Incorrect fields',
        description: `
          ${errors.email?.message || errors.password?.message || ''}
        `,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [errors, toast]);

  const onSubmit = handleSubmit((data: UserLoginField) => {
    console.log(data);
  });

  return (
    <Center minH="80vh" overflowX="hidden">
      <VStack spacing="48px" w="500px">
        <Text as="h1" fontSize="32px">
          Log in
        </Text>
        <form onSubmit={onSubmit}>
          <VStack spacing="24px" w="100%">
            <Input
              placeholder="E-mail address"
              type="email"
              {...register('email', { required: true })}
            />
            <Input
              placeholder="Password"
              type="password"
              {...register('password', { required: true })}
            />
            <HStack justifyContent="space-between" width="100%">
              <Link to="/auth/register">
                <Box>
                  <Text _hover={{ fontDecoration: 'underline' }}>
                    Not registered ? Create an account now !
                  </Text>
                </Box>
              </Link>
              <Button fontWeight="bold" type="submit">
                Log in
              </Button>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Center>
  );
};

export default Login;
