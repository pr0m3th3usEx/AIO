import { Button } from '@chakra-ui/button';
import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import CreateWidgetModal from 'components/modals/CreateWidgetModal';
import UpdateWidgetModal from 'components/modals/UpdateWidgetModal';
import { FC, useState } from 'react';
import { Widget } from 'services/widget';
import { useAppSelector } from 'utils/hooks';

const Dashboard: FC = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  const openCreateWidgetModal = () => {
    setAddModalOpen(true);
  };

  const openUpdateWidgetModal = () => {
    setUpdateModalOpen(true);
  };

  return (
    <VStack w="100%" align="start">
      {addModalOpen && (
        <CreateWidgetModal
          onCancel={() => setAddModalOpen(false)}
          onClose={() => {
            setAddModalOpen(false);
          }}
          isOpen={addModalOpen}
        />
      )}

      {updateModalOpen && (
        <UpdateWidgetModal
          onCancel={() => {
            setUpdateModalOpen(false);
          }}
          onSubmit={(data) => {}}
          isOpen={updateModalOpen}
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
