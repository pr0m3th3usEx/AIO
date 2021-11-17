import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout';
import { Input, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Register: FC = (): JSX.Element => {
  return (
    <Center minH="80vh" overflowX="hidden">
      <VStack spacing="48px" w="500px">
        <Text as="h1" fontSize="32px">
          Sign up
        </Text>

        <VStack spacing="24px" w="100%">
          <Input placeholder="Username" type="text" />
          <Input placeholder="E-mail address" type="email" />
          <Input placeholder="Password" type="password" />
          <Input placeholder="Confirmation password" type="password" />
          <HStack justifyContent="space-between" width="100%">
            <Box>
              <Link to="/auth/login">
                <Text _hover={{ fontDecoration: 'underline' }}>
                  Already registered ? Connect to your dashboard now !
                </Text>
              </Link>
            </Box>
            <Button fontWeight="bold">Sign up</Button>
          </HStack>
        </VStack>
      </VStack>
    </Center>
  );
};

export default Register;
