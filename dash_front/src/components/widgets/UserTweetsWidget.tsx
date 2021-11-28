import { HStack, Link, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { Image, Skeleton } from '@chakra-ui/react';
import { TwitterUser, UserTweets, WidgetParameter } from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  lastRefresh: Date | null;
  parameters: WidgetParameter[];
  refreshRate: number;
  data?: UserTweets;
}

const Tweet = ({
  id,
  created_at,
  text,
  author,
}: {
  id: string;
  created_at: string | Date;
  text: string;
  author: TwitterUser;
}) => {
  return (
    <VStack
      w="100%"
      spacing="12px"
      align="start"
      _hover={{
        background: 'gray.light',
      }}
      p="6px"
      cursor="pointer"
      onClick={() =>
        window.open(
          `https://twitter.com/${author.username}/status/${id}`,
          '_blank',
        )
      }
    >
      <HStack w="100%" spacing="12px">
        <Image
          src={author.profile_image_url}
          w="32px"
          h="32px"
          borderRadius="50%"
        />
        <Text color="black" fontWeight="bold">
          <Link href={`https://twitter.com/${author.username}`} isExternal>
            {author.name}
          </Link>
        </Text>
      </HStack>
      <Text color="black">{text}</Text>
      <HStack spacing="12px" justifyContent="space-between" width="100%">
        <Text color="gray">
          <Link href={`https://twitter.com/${author.username}/status/${id}`}>
            View more...
          </Link>
        </Text>
        <Text color="gray" fontStyle="italic" fontSize="12px">
          published at {created_at}
        </Text>
      </HStack>
    </VStack>
  );
};

const UserTweetsWidget = ({
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
          fontSize={{ base: '14px', md: '15px', lg: '16px' }}
          fontWeight="700"
        >
          25 derniers tweets de{' '}
          <Text as="pre" display="inline" fontWeight="500">
            @{parameters[0].value_string}
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
        divider={<StackDivider borderColor="gray.200" />}
      >
        {data === undefined ? (
          <Skeleton />
        ) : (
          data.tweets.map((tweet) => (
            <Tweet
              id={tweet.id}
              created_at={tweet.created_at}
              text={tweet.text}
              author={data.user}
            />
          ))
        )}
      </VStack>
    </VStack>
  );
};

export default UserTweetsWidget;
