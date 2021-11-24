import { HStack, Text, VStack } from '@chakra-ui/layout';

const LabelWrapperInput = ({
  children,
  label,
  inline,
}: {
  children: JSX.Element;
  label?: string;
  inline?: boolean;
}): JSX.Element => (
  <VStack
    width={inline ? '' : '100%'}
    display={inline ? 'inline-block' : 'flex'}
    align="start"
  >
    {label && (
      <HStack w="100%">
        <Text color="gray" fontWeight="800" lineHeight="21px">
          {label}
        </Text>
      </HStack>
    )}
    {children}
  </VStack>
);

export default LabelWrapperInput;
