import { Button } from '@chakra-ui/button';
import { Box, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import { useEffect, useState } from 'react';
import { useTranslateMutation, WidgetParameter } from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  lastRefresh: Date | null;
  parameters: WidgetParameter[];
  refreshRate: number;
}

const TranslatorWidget = ({ id, parameters }: WidgetProps) => {
  const [srcTxt, setSourceTxt] = useState('');
  const [trTxt, setTranslationText] = useState('');
  const [translate, { data, isLoading, isSuccess, isError, error }] =
    useTranslateMutation();

  useEffect(() => {
    if (isLoading) {
      setTranslationText('...');
    }
    if (!isLoading && isSuccess && data) {
      console.log(data);
      setTranslationText(data.text);
    }
    if (!isLoading && isError) {
      console.log(error);
      setTranslationText('No translation available');
    }
  }, [isLoading, isSuccess, isError, error, data]);

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
          Translate from{' '}
          <Text as="pre" display="inline" fontWeight="500">
            {parameters[0]?.value_string}
          </Text>{' '}
          to{' '}
          <Text as="pre" display="inline" fontWeight="500">
            {parameters[1]?.value_string}
          </Text>{' '}
        </Text>
      </VStack>

      <VStack
        w="100%"
        h="100%"
        align="start"
        maxH="250px"
        overflowY="auto"
        overflowX="hidden"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Box w="100%" h="100px" position="relative">
          <Textarea
            value={srcTxt}
            onChange={(e) => setSourceTxt(e.target.value)}
            color="black"
            placeholder={parameters[0]?.value_string ?? 'Enter your text'}
            _placeholder={{ color: 'gray' }}
            resize="none"
          />
          <Button
            zIndex={1}
            position="absolute"
            bottom="10px"
            right="10px"
            isLoading={isLoading}
            onClick={() => translate({ text: srcTxt, id })}
          >
            Translate
          </Button>
        </Box>
        <Box w="100%" h="100px">
          <Textarea
            isReadOnly
            value={trTxt}
            color="black"
            placeholder={parameters[1]?.value_string ?? 'Your translation'}
            _placeholder={{ color: 'gray' }}
            resize="none"
          />
        </Box>
      </VStack>
    </VStack>
  );
};

export default TranslatorWidget;
