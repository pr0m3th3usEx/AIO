import { Box, Text, VStack, HStack } from '@chakra-ui/layout';
import { Button, Input, useToast } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { IsEmail, MinLength } from 'class-validator';
import { useForm } from 'react-hook-form';
import { LoginUserDto, useLoginMutation } from 'services/user';
import { useAppDispatch } from 'utils/hooks';
import { setToken } from 'store/auth.slice';
import { setUser } from 'store/user.slice';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserLoginField>({ resolver });

  const [runLogin, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

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

  useEffect(() => {
    if (!isLoading && isError && error) {
      toast({
        title: 'Email or password incorrect',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [isLoading, isError, error, toast]);

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      const { access_token: token, user } = data;
      localStorage.setItem('token', token);
      dispatch(setToken(token));
      dispatch(setUser(user));
      window.location.href = '/';
    }
  }, [dispatch, navigate, isLoading, data, isSuccess]);

  const onSubmit = handleSubmit((data: UserLoginField) => {
    const dto: LoginUserDto = {
      email: data.email,
      password: data.password,
    };
    runLogin(dto);
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
              <Button fontWeight="bold" type="submit" isLoading={isLoading}>
                Log in
              </Button>
              <Link to="/auth/register" reloadDocument>
                <Box>
                  <Text _hover={{ fontDecoration: 'underline' }}>
                    Not registered ? Create an account now !<br />
                  </Text>
                </Box>
              </Link>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Center>
  );
};

export default Login;
