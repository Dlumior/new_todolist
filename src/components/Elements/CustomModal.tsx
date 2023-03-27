import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Dispatch, FC } from "react";
import { ActionAdd, ActionKind, ActionRemove } from "@/pages";
import * as crypto from "crypto";

type CustomModelProps = {
  handleAdd: Dispatch<ActionAdd | ActionRemove>;
};

type FormData = {
  topicTitle: string;
};

export const CustomModal: FC<CustomModelProps> = (props) => {
  const { handleAdd } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = (values: FormData) => {
    handleAdd({
      type: ActionKind.Add,
      payload: {
        id: window.crypto.randomUUID(),
        title: values.topicTitle,
        done: false,
      },
    });
    reset({ topicTitle: "" });
    onClose();
  };
  return (
    <>
      <Button variant={"solid"} size={"sm"} onClick={onOpen}>
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isInvalid={errors.topicTitle !== undefined}>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input
                  id="topicTitle"
                  placeholder="topicTitle"
                  {...register("topicTitle", {
                    required: "This is required",
                    minLength: { value: 4, message: "Minimum length should be 4" },
                  })}
                />
                <FormErrorMessage>{errors.topicTitle && errors.topicTitle.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="solid" colorScheme="blue" isLoading={isSubmitting} type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
