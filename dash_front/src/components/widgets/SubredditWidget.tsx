import { Image } from '@chakra-ui/image';
import { HStack, Link, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import {
  WidgetParameter,
  Post as PostType,
  Thing,
  List,
} from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  lastRefresh: Date | null;
  parameters: WidgetParameter[];
  refreshRate: number;
  data?: Thing<List<PostType>>;
}

const Post = ({
  author,
  subreddit,
  title,
  url,
  media,
  score,
  likes,
  clicked,
  thumbnail,
}: {
  author: string;
  subreddit: string;
  title: string;
  url: string;
  media?: string;
  score: number;
  likes: number;
  clicked: boolean;
  thumbnail: string;
}) => {
  return (
    <VStack
      w="100%"
      spacing="24px"
      align="start"
      _hover={{
        background: 'gray.light',
      }}
      p="24px"
      cursor="pointer"
      onClick={() => window.open(url, '_blank')}
    >
      <VStack w="100%" spacing="12px" align="start" fontSize={['12px', '14px']}>
        <Text color="gray">By {author}</Text>
        <HStack spacing="24px" w="100%" minH="100px" alignItems="start">
          <Image src={thumbnail} h="100px" />
          <Text color="black" fontWeight="600">
            {title}
          </Text>
        </HStack>
      </VStack>
      {url && (
        <Text color="black">
          <Text as="span" color="grey">
            Link:&nbsp;
            <Link href={url} isExternal>
              {url.length < 40 ? url : url.substr(0, 40) + '...'}
            </Link>
          </Text>
        </Text>
      )}
    </VStack>
  );
};
const SubredditWidget = ({
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
          data.data.children.map((post) => {
            return (
              <Post
                key={post.data.title}
                subreddit={post.data.subreddit}
                author={post.data.author}
                title={post.data.title}
                url={post.data.url}
                score={post.data.score}
                likes={post.data.likes}
                clicked={post.data.clicked}
                thumbnail={post.data.thumbnail}
              />
            );
          })
        )}
      </VStack>
    </VStack>
  );
};

export default SubredditWidget;
