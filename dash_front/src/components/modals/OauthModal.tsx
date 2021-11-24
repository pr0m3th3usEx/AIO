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
import { useToast } from '@chakra-ui/toast';
import { useEffect, useState } from 'react';
import {
  ServiceType,
  useGetServiceAuthorizationUrlQuery,
} from 'services/service';

interface ModalProps {
  onSuccess: () => void;
  onFailure: () => void;
  onCancel: () => void;
  isOpen: boolean;
  serviceName: ServiceType;
  serviceId: string | undefined;
}

const OAuthModal = ({
  onSuccess,
  onFailure,
  onCancel,
  isOpen,
  serviceName,
  serviceId,
}: ModalProps) => {
  const [skipReq, setSkipReq] = useState<boolean>(true);
  const [activationLoading, setActivationLoading] = useState<boolean>(false);
  const toast = useToast();
  const { data, isLoading, isSuccess, isError, error } =
    useGetServiceAuthorizationUrlQuery(serviceName, {
      skip: skipReq,
    });

  const connect = () => {
    setActivationLoading(true);
    localStorage.setItem('service', serviceName);
    if (serviceId) {
      localStorage.setItem('service_id', serviceId);
    }
    setSkipReq(false);
  };

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      window.location.href = data?.authorize_url;
    } else if (isError) {
      toast({
        title: 'Error',
        description: 'An error occured',
        duration: 3000,
        status: 'error',
      });
    }
  }, [data, isLoading, isSuccess, isError, error, toast]);

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
            <Button
              isLoading={activationLoading}
              variant="light"
              fontSize="18px"
              fontWeight="bold"
              onClick={() => connect()}
            >
              Connect to {serviceName}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OAuthModal;
