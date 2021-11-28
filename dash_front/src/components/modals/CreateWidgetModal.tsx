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
import { Skeleton, useToast } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import LabelWrapperInput from 'components/inputs/LabelWrapperInput';
import { useFieldParameters } from 'hooks/useFieldParameters';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  ServiceType,
  useGetServicesAvailableQuery,
  useGetWidgetsFromServiceQuery,
} from 'services/service';
import {
  AddWidgetFields,
  CreateWidgetDto,
  useAddNewWidgetMutation,
  WidgetParameterConfiguration,
  WidgetParameterDto,
} from 'services/widget';

interface ModalProps {
  onCancel: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const CreateWidgetModal = ({ onCancel, onClose, isOpen }: ModalProps) => {
  const [serviceId, setServiceId] = useState<string | undefined>(undefined);
  const [skipWidget, setSkipWidget] = useState<boolean>(true);
  const [showParams, setShowParams] = useState<boolean>(false);
  const [widgetParams, setWidgetParams] = useState<
    WidgetParameterConfiguration[] | undefined
  >(undefined);
  const {
    data: services,
    isLoading: isLoadingServices,
    isSuccess: isServicesFetchSuccess,
    isError: isServicesFetchError,
    error: serviceFetchError,
  } = useGetServicesAvailableQuery();
  const [addNewWidget, { data, isLoading, isSuccess, isError, error }] =
    useAddNewWidgetMutation();

  const { widgetParameters, setParamElement } = useFieldParameters<
    WidgetParameterDto,
    WidgetParameterConfiguration
  >(widgetParams);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: fieldErrors },
  } = useForm<AddWidgetFields>();

  const watchService = watch('serviceName');
  const watchWidget = watch('type');
  const {
    data: wData,
    isLoading: wIsLoading,
    isSuccess: wIsSuccess,
    isError: wIsError,
    isUninitialized: wIsUninitialized,
  } = useGetWidgetsFromServiceQuery(watchService, {
    skip: skipWidget,
  });
  const toast = useToast();

  useEffect(() => {
    if (watchService) {
      setServiceId(services?.find((s) => s.name === watchService)?.id);
      setSkipWidget(false);
    } else {
      setServiceId(undefined);
      setSkipWidget(true);
    }
  }, [watchService, services]);

  useEffect(() => {
    if (watchWidget) {
      const params = wData?.find((w) => w.type === watchWidget)?.params;

      setShowParams(true);
      setWidgetParams(params);
    } else {
      setShowParams(false);
    }
  }, [wData, watchWidget]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast({
        duration: 3000,
        status: 'success',
        title: 'Widget created',
      });
      onClose();
    } else if (!isLoading && isError) {
      toast({
        duration: 3000,
        status: 'error',
        title: 'Une erreur est survenue',
      });
    }
  }, [isSuccess, isLoading, isError, error, toast]);

  const onFormSubmit = (data: AddWidgetFields) => {
    if (widgetParameters.length !== widgetParams?.length) {
      toast({
        title: 'Invalid parameters',
        duration: 3000,
        status: 'error',
      });
      return;
    }
    const dto: CreateWidgetDto = {
      service_id: serviceId ?? '',
      parameters: widgetParameters,
      refresh_rate: data.refresh_rate,
      type: data.type,
    };

    addNewWidget(dto);
  };

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

        {isLoadingServices && isServicesFetchSuccess ? (
          <Skeleton />
        ) : (
          <ModalBody pt="32px" pb="32px">
            <form
              onSubmit={handleSubmit((data) => onFormSubmit(data))}
              style={{ width: '100%' }}
            >
              <VStack spacing="32px" align="start">
                <LabelWrapperInput label="Select service">
                  <Select
                    placeholder="..."
                    variant="primary"
                    {...register('serviceName', { required: true })}
                  >
                    {services
                      ?.filter((service) => service.isActivated)
                      .map((service) => {
                        return (
                          <option key={service.name} value={service.name}>
                            {service.name}
                          </option>
                        );
                      })}
                  </Select>
                </LabelWrapperInput>

                {!wIsUninitialized && !wIsLoading && wIsSuccess && wData && (
                  <>
                    <LabelWrapperInput label="Select widget">
                      <Select
                        placeholder="..."
                        variant="primary"
                        {...register('type', { required: true })}
                      >
                        {wData?.map((widget, idx) => {
                          return (
                            <option key={idx} value={widget.type}>
                              {widget.description}
                            </option>
                          );
                        })}
                      </Select>
                    </LabelWrapperInput>

                    {showParams && (
                      <>
                        <Text color="black" fontSize="18px">
                          Set up your widget
                        </Text>

                        <LabelWrapperInput label="Refresh Rate (en s)">
                          <Input
                            type="number"
                            min="0"
                            placeholder="Refresh rate"
                            variant="light"
                            {...register('refresh_rate', {
                              valueAsNumber: true,
                              min: 0,
                              max: 600,
                              required: true,
                            })}
                          />
                        </LabelWrapperInput>
                        {widgetParams?.map((field, idx) => (
                          <LabelWrapperInput
                            key={field.name}
                            label={field.name}
                          >
                            <Input
                              placeholder={field.name}
                              variant="light"
                              type={
                                widgetParams &&
                                widgetParams[idx].type === 'string'
                                  ? 'text'
                                  : 'number'
                              }
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                              ) => {
                                setParamElement(idx, {
                                  name: field.name,
                                  value: e.target.value,
                                });
                              }}
                            />
                          </LabelWrapperInput>
                        ))}
                      </>
                    )}
                  </>
                )}
                <HStack
                  w="100%"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing="24px"
                >
                  <Button
                    variant="link"
                    onClick={onCancel}
                    disabled={isLoading}
                  >
                    CANCEL
                  </Button>
                  <Button variant="light" type="submit" isLoading={isLoading}>
                    ADD
                  </Button>
                </HStack>
              </VStack>
            </form>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateWidgetModal;
