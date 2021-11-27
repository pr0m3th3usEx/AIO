import { Box, HStack, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useEffect, useState } from 'react';
import { useGetServiceInfoQuery } from 'services/service';
import {
  useRefreshWidgetMutation,
  Widget as WidgetType,
} from 'services/widget';
import ErrorIllustration from 'assets/error.svg';
import { Image } from '@chakra-ui/image';
import detailsIllustration from 'assets/details.svg';
import CryptoWidget from './widgets/CryptoWidget';
import SubredditWidget from './widgets/SubredditWidget';
import UserTweetsWidget from './widgets/UserTweetsWidget';
import UpdateWidgetModal from './modals/UpdateWidgetModal';
import { toast, useToast } from '@chakra-ui/toast';

const WidgetCanvas = ({ widget }: { widget: WidgetType }) => {
  if (widget.type === 'CRYPTO') {
    return (
      <CryptoWidget
        id={widget.id}
        serviceId={widget.service_id}
        refreshRate={widget.refresh_rate}
        parameters={widget.parameters}
      />
    );
  }

  if (widget.type === 'SUBREDDIT') {
    return (
      <SubredditWidget
        id={widget.id}
        serviceId={widget.service_id}
        refreshRate={widget.refresh_rate}
        parameters={widget.parameters}
      />
    );
  }
  if (widget.type === 'USER_TWEETS') {
    return (
      <UserTweetsWidget
        id={widget.id}
        serviceId={widget.service_id}
        refreshRate={widget.refresh_rate}
        parameters={widget.parameters}
      />
    );
  }
  // if (widget.type === 'CITY_TEMPERATURE')
  // if (widget.type === 'INTRA')
  // if (widget.type === 'TRANSLATOR')
  return <></>;
};

const WidgetError = ({ activated }: { activated?: boolean }) => {
  return (
    <VStack
      p="12px"
      spacing="15px"
      alignItems="center"
      alignContent="center"
      h="100%"
      w="100%"
    >
      <Image src={ErrorIllustration} w="64px" h="64px" />
      <Text color="gray">
        {activated === undefined
          ? 'An error occured'
          : 'Service is not activated'}
      </Text>
    </VStack>
  );
};

const Widget = ({ data }: { data: WidgetType }) => {
  const [currentWidgetData, setCurrentWidgetData] = useState(data);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const {
    data: service,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetServiceInfoQuery(data.service_id);
  const [
    refreshWidget,
    {
      data: refreshData,
      isLoading: isRefreshing,
      isSuccess: isRefreshSuccess,
      isError: isRefreshError,
      error: refreshError,
    },
  ] = useRefreshWidgetMutation();

  const toast = useToast();

  useEffect(() => {
    if (!isLoading && isError) {
      console.log(error);
    }
  }, [service, isLoading, isSuccess, isError, error]);

  const openUpdateWidgetModal = () => {
    setUpdateModalOpen(true);
  };

  useEffect(() => {
    if (!isRefreshing) {
      if (isRefreshSuccess) {
        console.log(refreshData);
      }

      if (isRefreshError) {
        console.log(refreshError);
      }
    }
  }, [
    isRefreshing,
    isRefreshSuccess,
    isRefreshError,
    refreshData,
    refreshError,
  ]);

  useEffect(() => {
    const interval = setInterval(() => refreshWidget(data.id), 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <VStack
      w={{ base: '100%', sm: '100%', md: 'auto' }}
      h="100%"
      bg="white"
      spacing={0}
      borderRadius="12px"
    >
      {updateModalOpen && (
        <UpdateWidgetModal
          widget_id={data.id}
          currentRefreshRate={data.refresh_rate}
          parameters={data.parameters}
          onCancel={() => setUpdateModalOpen(false)}
          onClose={() => setUpdateModalOpen(false)}
          isOpen={updateModalOpen}
        />
      )}

      <HStack
        w="100%"
        h="40px"
        justifyContent="flex-end"
        padding="0 12px"
        onClick={() => openUpdateWidgetModal()}
      >
        <Image src={detailsIllustration} w="24px" cursor="pointer" />
      </HStack>
      <Box border="1px solid" borderColor="gray.200" minW="100%" h="1px" />
      {isLoading && <Spinner size="xl" color="turquoise" thickness="4px" />}
      {((!isLoading && isError) || (service && !service.is_activated)) && (
        <WidgetError activated={service?.is_activated} />
      )}
      {!isLoading && isSuccess && service?.is_activated && (
        <WidgetCanvas
          widget={currentWidgetData}
          // isLoading={isRefreshLoading}
          // data={refreshed}
        />
      )}
    </VStack>
  );
};

export default Widget;
