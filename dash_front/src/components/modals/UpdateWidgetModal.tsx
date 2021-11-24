import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { HStack, Text, VStack } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import LabelWrapperInput from 'components/inputs/LabelWrapperInput';

interface ModalProps {
  onCancel: () => void;
  onSubmit: (d: string) => void;
  isOpen: boolean;
}

const UpdateWidgetModal = ({ onCancel, onSubmit, isOpen }: ModalProps) => {
  const size = useBreakpointValue({ sm: 'SM', md: 'md' });

  const onFormSubmit = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalHeader>
          <Text color="black" fontSize="18px">
            CONFIGURE WIDGET
          </Text>
        </ModalHeader>
        <ModalCloseButton color="black" />
        <ModalBody pt="32px" pb="32px">
          <form onSubmit={onFormSubmit} style={{ width: '100%' }}>
            <VStack spacing="32px" align="start">
              <LabelWrapperInput label="Refresh Rate">
                <Input
                  type="number"
                  min="0"
                  placeholder="Refresh rate"
                  variant="light"
                />
              </LabelWrapperInput>
              <LabelWrapperInput label="Other parameters">
                <Input placeholder="..." variant="light" />
              </LabelWrapperInput>
              <HStack
                w="100%"
                justifyContent="flex-end"
                alignItems="center"
                spacing="24px"
              >
                <Button variant="link" onClick={onCancel}>
                  CANCEL
                </Button>
                <Button variant="light" type="submit">
                  SAVE
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateWidgetModal;
