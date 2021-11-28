import { Text, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/react';
import { ExchangeRate, WidgetParameter } from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  lastRefresh: Date | null;
  parameters: WidgetParameter[];
  refreshRate: number;
  data?: ExchangeRate;
}

const CryptoWidget = ({
  id,
  serviceId,
  lastRefresh,
  parameters,
  refreshRate,
  data,
}: WidgetProps) => {
  return (
    <VStack
      align="start"
      spacing="24px"
      w="100%"
      p={{ base: '12px', sm: '16px', md: '24px' }}
    >
      <VStack align="start" spacing="12px">
        <Text
          color="black"
          fontSize={{ base: '24px', md: '28px', lg: '32px' }}
          fontWeight="500"
        >
          Cours du {parameters[0].value_string}
        </Text>
        <Text
          color="black"
          fontSize={{ base: '13px', sm: '13px', md: '14px', lg: '16px' }}
          opacity="0.54"
        >
          Last refresh: {lastRefresh}
        </Text>
      </VStack>

      {data === undefined ? (
        <Skeleton />
      ) : (
        <Text color="black" fontWeight="bold" fontSize="24px">
          1 {data.asset_id_base} = {data.rate.toFixed(2)} {data.asset_id_quote}
        </Text>
      )}
    </VStack>
  );
};

export default CryptoWidget;
