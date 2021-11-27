import { Image } from '@chakra-ui/image';
import { HStack, Link, StackDivider, Text, VStack } from '@chakra-ui/layout';
import {
  WidgetParameter,
  Post as PostType,
  Thing,
  List,
} from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  parameters: WidgetParameter[];
  refreshRate: number;
  // isLoading: boolean;
  // data: Thing<List<PostType>>;
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
}: PostType) => {
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
      <Text color="black">
        <Text as="span" color="grey">
          Link:&nbsp;
          <Link href={url} isExternal>
            {url.length < 40 ? url : url.substr(0, 40) + '...'}
          </Link>
        </Text>
      </Text>
    </VStack>
  );
};

const SubredditWidget = ({
  id,
  serviceId,
  parameters,
  refreshRate,
}: // isLoading,
// data,
WidgetProps) => {
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

      <VStack
        w="100%"
        align="start"
        maxH="250px"
        overflowY="auto"
        overflowX="hidden"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Post
          author="u/DrinkMoreCodeMore"
          subreddit="r/Technology"
          title="A North Korean man who smuggled 'Squid Game' into the country is to be executed by firing squad and a high-school student who bought a USB drive with the show will be jailed for life, report says"
          url="https://www.businessinsider.com/north-korea-execution-life-sentence-hard-labor-squid-game-2021-11"
          score={10}
          likes={15}
          clicked={false}
          thumbnail="https://b.thumbs.redditmedia.com/_XcbGJpCec_DGeeneAl69zAS3acpaylDI_RriHpjINI.jpg"
        />
        <Post
          author="u/DrinkMoreCodeMore"
          subreddit="r/Technology"
          title="A North Korean man who smuggled 'Squid Game' into the country is to be executed by firing squad and a high-school student who bought a USB drive with the show will be jailed for life, report says"
          url="https://www.businessinsider.com/north-korea-execution-life-sentence-hard-labor-squid-game-2021-11"
          score={10}
          likes={15}
          clicked={false}
          thumbnail="https://b.thumbs.redditmedia.com/_XcbGJpCec_DGeeneAl69zAS3acpaylDI_RriHpjINI.jpg"
        />
        <Post
          author="u/DrinkMoreCodeMore"
          subreddit="r/Technology"
          title="A North Korean man who smuggled 'Squid Game' into the country is"
          url="https://www.businessinsider.com/north-korea-execution-life-sentence-hard-labor-squid-game-2021-11"
          score={10}
          likes={15}
          clicked={false}
          thumbnail="https://b.thumbs.redditmedia.com/_XcbGJpCec_DGeeneAl69zAS3acpaylDI_RriHpjINI.jpg"
        />
      </VStack>
    </VStack>
  );
};

export default SubredditWidget;
