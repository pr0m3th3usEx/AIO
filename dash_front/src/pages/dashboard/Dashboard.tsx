import { Button } from '@chakra-ui/button';
import { Grid, HStack, Text, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useToast } from '@chakra-ui/toast';
import CreateWidgetModal from 'components/modals/CreateWidgetModal';
import Widget from 'components/Widget';
import { FC, useEffect, useState } from 'react';
import { useGetUserWidgetsQuery } from 'services/widget';

const Dashboard: FC = (): JSX.Element => {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const toast = useToast();
  const {
    data: widgets,
    isLoading: isWidgetsLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserWidgetsQuery();

  useEffect(() => {
    if (!isWidgetsLoading) {
      if (isError && error) {
        toast({
          status: 'error',
          title: 'Error',
          description: "Couldn't load your widgets",
          duration: 3000,
        });
      }
    }
  }, [toast, widgets, isWidgetsLoading, isSuccess, isError, error]);

  const openCreateWidgetModal = () => {
    setAddModalOpen(true);
  };

  return (
    <VStack w="100%" align="start">
      {addModalOpen && (
        <CreateWidgetModal
          onCancel={() => setAddModalOpen(false)}
          onClose={() => setAddModalOpen(false)}
          isOpen={addModalOpen}
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
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={4}
        w="100%"
        h="100%"
        padding={{ base: '10px', sm: '12px', md: '14px', lg: '16px' }}
      >
        {isWidgetsLoading ? (
          <Skeleton />
        ) : (
          widgets?.map((widget) => <Widget key={widget.id} data={widget} />)
        )}
      </Grid>
    </VStack>
  );
};

export default Dashboard;
