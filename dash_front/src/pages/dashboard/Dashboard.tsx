import { Button } from '@chakra-ui/button';
import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import CreateWidgetModal from 'components/modals/CreateWidgetModal';
import { FC, useState } from 'react';
import { useAppSelector } from 'utils/hooks';

const Dashboard: FC = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openCreateWidgetModal = () => {
    setModalOpen(true);
  };

  return (
    <VStack w="100%" align="start">
      {modalOpen && (
        <CreateWidgetModal
          onCancel={() => setModalOpen(false)}
          onSubmit={(data) => {}}
          isOpen={modalOpen}
        />
      )}

      <HStack
        w="100%"
        p={{ base: '10px', sm: '12px', md: '16px', lg: '18px' }}
        justifyContent="space-between"
      >
        <Button
          onClick={() => openCreateWidgetModal()}
          variant="light"
          textTransform="uppercase"
          fontWeight="bold"
        >
          Add widget
        </Button>
        <HStack>
          <Text color="black">Layout manager</Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default Dashboard;
