import { Box, Text, VStack, HStack } from '@chakra-ui/layout';
import { Button, Input } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Login: FC = (): JSX.Element => {
  return (
    <Center minH="80vh" overflowX="hidden">
      <VStack spacing="48px" w="500px">
        <Text as="h1" fontSize="32px">
          Log in
        </Text>

        <VStack spacing="24px" w="100%">
          <Input placeholder="E-mail address" type="email" />
          <Input placeholder="Password" type="password" />
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
      </VStack>
    </Center>
  );
};

export default Login;
