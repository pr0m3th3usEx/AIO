import { List, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { IntraModuleInfo, WidgetParameter } from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  lastRefresh: Date | null;
  parameters: WidgetParameter[];
  refreshRate: number;
  data?: IntraModuleInfo;
}

const IntraModuleWidget = ({ lastRefresh, parameters, data }: WidgetProps) => {
  return data === undefined ? (
    <Skeleton />
  ) : (
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
          EPITECH - Information about module{' '}
          <Text as="pre" display="inline" fontWeight="500">
            {parameters[0].value_string}
          </Text>
        </Text>
        <Text
          color="black"
          fontSize={{ base: '13px', sm: '13px', md: '14px', lg: '16px' }}
          opacity="0.54"
        >
          Last refresh: {lastRefresh}
        </Text>
      </VStack>

      <VStack
        w="100%"
        align="start"
        maxH="250px"
        overflowY="auto"
        overflowX="hidden"
      >
        <VStack w="100%" align="start">
          <Text color="black">Crédits: {data.credits}</Text>
          <Text color="black">Grade: {data.grade}</Text>

          <Text color="black" fontWeight="bold">
            Activies where your are registered:
          </Text>
          <UnorderedList pl="32px">
            {data.activities
              .filter((activity) => activity.registered)
              .map((activity) => (
                <ListItem color="black">{activity.title}</ListItem>
              ))}
          </UnorderedList>
          <Text color="black" fontWeight="bold">
            Activies where your are not registered:
          </Text>
          <UnorderedList pl="32px">
            {data.activities
              .filter((activity) => !activity.registered)
              .map((activity) => (
                <ListItem color="black">{activity.title}</ListItem>
              ))}
          </UnorderedList>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default IntraModuleWidget;
