import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Select } from '@chakra-ui/select';
import LabelWrapperInput from 'components/inputs/LabelWrapperInput';

interface ModalProps {
  onCancel: () => void;
  onSubmit: (d: string) => void;
  isOpen: boolean;
}

const CreateWidgetModal = ({ onCancel, onSubmit, isOpen }: ModalProps) => {
  const size = useBreakpointValue({ sm: 'SM', md: 'md' });

  const onFormSubmit = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalHeader>
          <Text color="black" fontSize="18px">
            ADD WIDGET
          </Text>
        </ModalHeader>
        <ModalCloseButton color="black" />
        <ModalBody pt="32px" pb="32px">
          <form onSubmit={onFormSubmit} style={{ width: '100%' }}>
            <VStack spacing="32px" align="start">
              <LabelWrapperInput label="Select service">
                <Select placeholder="..." variant="primary">
                  <option>Test 1</option>
                  <option>Test 2</option>
                  <option>Test 3</option>
                  <option>Test 4</option>
                  <option>Test 5</option>
                </Select>
              </LabelWrapperInput>

              <LabelWrapperInput label="Select widget">
                <Select placeholder="..." variant="primary">
                  <option>Test 1</option>
                  <option>Test 2</option>
                  <option>Test 3</option>
                  <option>Test 4</option>
                  <option>Test 5</option>
                </Select>
              </LabelWrapperInput>
              <Text color="black" fontSize="18px">
                Set up your widget
              </Text>

              <LabelWrapperInput label="Refresh Rate">
                <Input
                  type="number"
                  min="0"
                  placeholder="Refresh rate"
                  variant="light"
                />
              </LabelWrapperInput>
              <LabelWrapperInput label="Other parameters">
                <Input
                  type="number"
                  min="0"
                  placeholder="Refresh rate"
                  variant="light"
                />
              </LabelWrapperInput>
              <HStack
                w="100%"
                justifyContent="flex-end"
                alignItems="center"
                spacing="24px"
              >
                <Button variant="link">CANCEL</Button>
                <Button variant="light" type="submit">
                  ADD
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateWidgetModal;
