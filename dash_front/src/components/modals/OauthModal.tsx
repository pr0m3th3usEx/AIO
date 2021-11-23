import { Button } from '@chakra-ui/button';
import { Text, VStack } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { ServiceType } from 'services/service';

interface ModalProps {
  onSuccess: () => void;
  onFailure: () => void;
  onCancel: () => void;
  isOpen: boolean;
  serviceName: ServiceType;
}

const OAuthModal = ({
  onSuccess,
  onFailure,
  onCancel,
  isOpen,
  serviceName,
}: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalHeader>
          <Text color="black" fontSize="18px">
            Authentication required
          </Text>
        </ModalHeader>
        <ModalCloseButton color="black" />
        <ModalBody pt="32px" pb="32px">
          <VStack w="100%" align="start">
            <Text color="black">
              Connect to your account to activate the service:
            </Text>
            <Button variant="light" fontSize="18px" fontWeight="bold">
              Connect to {serviceName}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OAuthModal;
