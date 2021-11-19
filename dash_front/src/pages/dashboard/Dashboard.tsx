import { Box, Text } from '@chakra-ui/layout';
import { FC } from 'react';
import { useAppSelector } from 'utils/hooks';

const Dashboard: FC = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);

  return (
    <Box>
      <Text color="black">{user?.username}</Text>
    </Box>
  );
};

export default Dashboard;
