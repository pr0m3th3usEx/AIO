import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
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
  useActivateServiceMutation,
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

function validURL(str: string) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
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
  const [autologinLink, setAutologinLink] = useState('');
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

  const [
    setActivationService,
    {
      isLoading: isActivationLoading,
      isSuccess: isActivationSuccess,
      isError: isActivationError,
    },
  ] = useActivateServiceMutation();

  useEffect(() => {
    if (!isActivationLoading && isActivationSuccess) {
      setAutologinLink('');
      onSuccess();
    }
    if (!isActivationLoading && isActivationError) {
      toast({
        status: 'error',
        title: 'Error occured',
        duration: 3000,
      });
    }
  }, [isActivationLoading, isActivationSuccess, isActivationError, toast]);

  const autologinConnect = () => {
    if (
      !validURL(autologinLink) ||
      autologinLink.length !==
        'https://intra.epitech.eu/auth-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
          .length
    ) {
      return;
    }

    setActivationService({
      service_id: serviceId,
      serviceType: serviceName,
      activated: true,
      accessToken: autologinLink,
    });
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
            {serviceName === 'INTRANET' ? (
              <>
                <Text color="black">Enter your autologin link:</Text>
                <Input
                  value={autologinLink}
                  placeholder="https://intra.epitech.eu/auth-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  variant="light"
                  onChange={(e) => setAutologinLink(e.target.value)}
                />
                <Button
                  isLoading={isActivationLoading}
                  variant="light"
                  fontSize="18px"
                  fontWeight="bold"
                  onClick={() => autologinConnect()}
                >
                  Activate
                </Button>
              </>
            ) : (
              <>
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
              </>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OAuthModal;
