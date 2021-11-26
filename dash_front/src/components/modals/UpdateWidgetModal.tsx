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
import LabelWrapperInput from 'components/inputs/LabelWrapperInput';
import { useFieldParameters } from 'hooks/useFieldParameters';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { WidgetParameter, WidgetParameterDto } from 'services/widget';

interface ModalProps {
  parameters: WidgetParameter[];
  currentRefreshRate: number;
  onCancel: () => void;
  onSubmit: (d: string) => void;
  isOpen: boolean;
}

type UpdateWidgetData = {
  refreshRate: number;
};

const UpdateWidgetModal = ({
  parameters,
  currentRefreshRate,
  onCancel,
  onSubmit,
  isOpen,
}: ModalProps) => {
  const { widgetParameters, setParamElement } = useFieldParameters<
    WidgetParameterDto,
    WidgetParameter
  >(parameters);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateWidgetData>({
    defaultValues: {
      refreshRate: currentRefreshRate,
    },
  });

  useEffect(() => {
    parameters.forEach((value, idx) => {
      setParamElement(idx, {
        name: value.name,
        value: value.value_string ?? value.value_int ?? '',
      });
    });
  }, [parameters]);

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
                  {...register('refreshRate', {
                    required: true,
                    min: 0,
                    valueAsNumber: true,
                  })}
                />
              </LabelWrapperInput>
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
