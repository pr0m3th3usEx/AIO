import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { HStack, Text, VStack } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useToast } from '@chakra-ui/toast';
import LabelWrapperInput from 'components/inputs/LabelWrapperInput';
import { useFieldParameters } from 'hooks/useFieldParameters';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  UpdateWidgetParameterDto,
  useUpdateWidgetMutation,
  WidgetParameter,
  WidgetParameterDto,
} from 'services/widget';

interface ModalProps {
  widget_id: string;
  parameters: WidgetParameter[];
  currentRefreshRate: number;
  onCancel: () => void;
  onClose: () => void;
  isOpen: boolean;
}

type UpdateWidgetData = {
  refreshRate: number;
};

const UpdateWidgetModal = ({
  widget_id,
  parameters,
  currentRefreshRate,
  onCancel,
  onClose,
  isOpen,
}: ModalProps) => {
  const { widgetParameters, setParamElement } = useFieldParameters<
    WidgetParameterDto,
    WidgetParameter
  >(parameters);
  const [
    updateWidget,
    { isSuccess: isUpdated, isError: isUpdateFailed, error: updateError },
  ] = useUpdateWidgetMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateWidgetData>({
    defaultValues: {
      refreshRate: currentRefreshRate,
    },
  });

  const toast = useToast();

  useEffect(() => {
    parameters.forEach((value, idx) => {
      setParamElement(idx, {
        name: value.name,
        value: value.value_string ?? value.value_int ?? '',
      });
    });
  }, [parameters]);

  const onFormSubmit = handleSubmit((data: UpdateWidgetData) => {
    const dto: UpdateWidgetParameterDto = {
      widget_id,
      refresh_rate: data.refreshRate,
      parameters: widgetParameters,
    };

    updateWidget(dto);
  });

  if (isUpdated) {
    onClose();
  }

  if (isUpdateFailed) {
    toast({
      status: 'error',
      title: 'Update failed',
      duration: 3000,
    });
  }

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
                  {...register('refreshRate', {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                />
              </LabelWrapperInput>
              {errors.refreshRate?.type === 'min' && (
                <Text color="red.500" fontSize="13px" fontWeight="600">
                  The refresh rate must be positive
                </Text>
              )}
              {parameters.map((field, idx) => (
                <LabelWrapperInput key={field.name} label={field.name}>
                  <Input
                    placeholder={field.name}
                    variant="light"
                    value={widgetParameters[idx]?.value}
                    type={
                      parameters && parameters[idx].type === 'STRING'
                        ? 'text'
                        : 'number'
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setParamElement(idx, {
                        name: field.name,
                        value: e.target.value,
                      });
                    }}
                  />
                </LabelWrapperInput>
              ))}{' '}
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
