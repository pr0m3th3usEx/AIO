import { Text, VStack } from '@chakra-ui/layout';
import { WidgetParameter } from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  parameters: WidgetParameter[];
  refreshRate: number;
}

const SubredditWidget = ({
  id,
  serviceId,
  parameters,
  refreshRate,
}: WidgetProps) => {
  // setInterval(async () => {

  // }, 1000);

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
          fontSize={{ base: '14px', md: '15px', lg: '16px' }}
          fontWeight="700"
        >
          25 derniers posts de{' '}
          <Text as="pre" display="inline" fontWeight="500">
            r/{parameters[0].value_string}
          </Text>
        </Text>
        <Text
          color="black"
          fontSize={{ base: '13px', sm: '13px', md: '14px', lg: '16px' }}
          opacity="0.54"
        >
          Last refresh:
        </Text>
      </VStack>
    </VStack>
  );
};

export default SubredditWidget;
