import { Text, VStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useEffect } from 'react';
import { useGetServiceInfoQuery } from 'services/service';
import { Widget as WidgetType } from 'services/widget';
import ErrorIllustration from 'assets/error.svg';
import { Image } from '@chakra-ui/image';
import CryptoWidget from './widgets/CryptoWidget';

const WidgetCanvas = ({ widget }: { widget: WidgetType }) => {
  // if (widget.type === 'CITY_TEMPERATURE')
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

  return <></>;
  // if (widget.type === 'INTRA')
  // if (widget.type === 'SUBREDDIT')
  // if (widget.type === 'TRANSLATOR')
  // if (widget.type === 'TWITTER')
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
  const {
    data: service,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetServiceInfoQuery(data.service_id);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      console.log(service);
    }
    if (!isLoading && isError) {
      console.log(error);
    }
  }, [service, isLoading, isSuccess, isError, error]);

  return (
    <VStack
      w={{ base: '100%', sm: '100%', md: '400px' }}
      h="100%"
      minH="300px"
      bg="white"
      borderRadius="12px"
    >
      {isLoading && <Spinner size="xl" color="turquoise" thickness="4px" />}
      {((!isLoading && isError) || (service && !service.is_activated)) && (
        <WidgetError activated={service?.is_activated} />
      )}
      {(!isLoading && isSuccess) ||
        (service?.is_activated && <WidgetCanvas widget={data} />)}
    </VStack>
  );
};

export default Widget;
