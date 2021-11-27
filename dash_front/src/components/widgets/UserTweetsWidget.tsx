import { HStack, Link, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { TwitterUser, WidgetParameter } from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  parameters: WidgetParameter[];
  refreshRate: number;
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
        <Tweet
          id="id"
          created_at="2015-07-07T00:00:00Z"
          text="This is the last tweet I did . :)"
          author={{
            name: 'Epitech Technology',
            username: 'Epitech',
            profile_image_url:
              'https://pbs.twimg.com/profile_images/1451185966471729156/-BLgag1A_normal.jpg',
            id: '8073902',
          }}
        />
        <Tweet
          id="id"
          created_at="2015-07-07T00:00:00Z"
          text="A North Korean man who smuggled 'Squid Game' into the country is to be executed by firing squad and a high-school student who bought a USB drive with the show will be jailed for life, report says"
          author={{
            name: 'Epitech Technology',
            username: 'Epitech',
            profile_image_url:
              'https://pbs.twimg.com/profile_images/1451185966471729156/-BLgag1A_normal.jpg',
            id: '8073902',
          }}
        />
        <Tweet
          id="id"
          created_at="2015-07-07T00:00:00Z"
          text="This is the last tweet I did . :)"
          author={{
            name: 'Epitech Technology',
            username: 'Epitech',
            profile_image_url:
              'https://pbs.twimg.com/profile_images/1451185966471729156/-BLgag1A_normal.jpg',
            id: '8073902',
          }}
        />
        <Tweet
          id="id"
          created_at="2015-07-07T00:00:00Z"
          text="This is the last tweet I did . :)"
          author={{
            name: 'Epitech Technology',
            username: 'Epitech',
            profile_image_url:
              'https://pbs.twimg.com/profile_images/1451185966471729156/-BLgag1A_normal.jpg',
            id: '8073902',
          }}
        />
        <Tweet
          id="id"
          created_at="2015-07-07T00:00:00Z"
          text="This is the last tweet I did . :)"
          author={{
            name: 'Epitech Technology',
            username: 'Epitech',
            profile_image_url:
              'https://pbs.twimg.com/profile_images/1451185966471729156/-BLgag1A_normal.jpg',
            id: '8073902',
          }}
        />
        <Tweet
          id="id"
          created_at="2015-07-07T00:00:00Z"
          text="This is the last tweet I did . :)"
          author={{
            name: 'Epitech Technology',
            username: 'Epitech',
            profile_image_url:
              'https://pbs.twimg.com/profile_images/1451185966471729156/-BLgag1A_normal.jpg',
            id: '8073902',
          }}
        />
      </VStack>
    </VStack>
  );
};

export default UserTweetsWidget;
