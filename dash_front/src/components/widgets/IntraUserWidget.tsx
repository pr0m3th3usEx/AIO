import { Image } from '@chakra-ui/image';
import {
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { IntraUserInfos, WidgetParameter } from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  lastRefresh: Date | null;
  parameters: WidgetParameter[];
  refreshRate: number;
  data?: IntraUserInfos;
}

const IntraUserWidget = ({ lastRefresh, parameters, data }: WidgetProps) => {
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
          EPITECH - Intranet user information
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
        <HStack w="100%" align="start" spacing="24px">
          <Image borderRadius="10px" src={data.picture} alt="Profile picture" />
          <VStack w="100%" align="start">
            <Text color="black" fontWeight="bold">
              {data.firstname} {data.lastname} (Promo {data.promo})
            </Text>
            <Text color="gray">{data.email}</Text>
            <Text color="black" fontWeight="bold">
              Credits:{' '}
              <Text color="black" fontWeight="normal" as="span">
                {data.credits}
              </Text>
            </Text>
            <Text color="black" fontWeight="bold">
              GPA:{' '}
              <Text color="black" fontWeight="normal" as="span">
                {data.gpa}
              </Text>
            </Text>
            <Text color="black" fontWeight="bold">
              Location:{' '}
              <Text color="black" fontWeight="normal" as="span">
                {data.location}
              </Text>
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default IntraUserWidget;
