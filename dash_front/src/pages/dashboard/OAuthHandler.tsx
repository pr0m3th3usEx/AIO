import { useToast } from '@chakra-ui/toast';
import Loader from 'components/Loader';
import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import {
  ServiceType,
  useActivateServiceMutation,
  useGetTokensMutation,
} from 'services/service';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const OAuthHandler = () => {
  const serviceToActivate = localStorage.getItem(
    'service',
  ) as ServiceType | null;
  const serviceId = localStorage.getItem('service_id');
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const toast = useToast();

  const [
    activateService,
    {
      data: activationData,
      isLoading: isActivationLoading,
      isSuccess: isActivationSuccess,
      isError: isActivationError,
      error: activationError,
    },
  ] = useActivateServiceMutation();
  const [getTokens, { data: tokens, isLoading, isSuccess, isError, error }] =
    useGetTokensMutation();

  useEffect(() => {
    if (!isActivationLoading && isActivationSuccess) {
      toast({
        status: 'success',
        title: 'Service activated',
        duration: 3000,
      });
      localStorage.removeItem('service_id');
      localStorage.removeItem('service');
      navigate('/dashboard/profile');
    } else if (!isActivationLoading && isActivationError) {
      console.log(activationError);
      localStorage.removeItem('service_id');
      localStorage.removeItem('service');

      toast({
        status: 'error',
        title: 'Error occured',
        description: "Couldn't activate the service",
        duration: 3000,
      });
      navigate('/dashboard/profile');
    }
  }, [
    toast,
    isActivationLoading,
    isActivationSuccess,
    isActivationError,
    activationError,
    navigate,
  ]);

  useEffect(() => {
    if (!isLoading && isSuccess && tokens && serviceToActivate && tokens) {
      console.log(tokens);
      activateService({
        serviceType: serviceToActivate,
        service_id: serviceId ?? undefined,
        activated: true,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      });
    } else if (!isLoading && isError) {
      toast({
        title: 'Error',
        description: 'Error trying grant tokens from 3rd Party',
        duration: 3000,
        isClosable: true,
        status: 'error',
      });
    }
  }, [tokens, isLoading, isSuccess, isError, error, toast, serviceToActivate]);

  useEffect(() => {
    if (serviceToActivate && serviceToActivate !== null) {
      getTokens({
        url: location.search,
        serviceType: serviceToActivate,
      });
    }
  }, [serviceToActivate, toast, location.search, getTokens]);

  if (!serviceToActivate) {
    return <Navigate to="/dashboard" />;
  } else {
  }

  return <Loader />;
};

export default OAuthHandler;
