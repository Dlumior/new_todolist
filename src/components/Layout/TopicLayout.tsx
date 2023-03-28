import { FC, ReactNode, useEffect } from "react";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTask } from "@/hooks/useTask";

type TopicLayoutProps = {
  children: ReactNode;
};

type FormData = {
  task: string;
};
export const TopicLayout: FC<TopicLayoutProps> = (props) => {
  const { children } = props;
  const { addTask } = useTask();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  function onSubmit(values: FormData) {
    addTask({
      id: window.crypto.randomUUID(),
      done: false,
      content: values.task,
    });
  }

  useEffect(() => {
    reset({ task: "" });
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <Box position={"sticky"} h={"50px"} bgColor={"moccasin"} display={"flex"} alignItems={"center"} p={2}>
        <Text>SKYA - TODO LIST</Text>
      </Box>
      <Box position={"sticky"} h={"55px"} display={"flex"} px={5} justifyContent={"center"}>
        <Box
          as={"form"}
          w={"100%"}
          gap={5}
          onSubmit={handleSubmit(onSubmit)}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormControl isInvalid={errors.task !== undefined}>
            <Input
              size={"sm"}
              id="task"
              placeholder="Add new task"
              autoComplete="off"
              {...register("task", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
          </FormControl>
          <Button size={"sm"} colorScheme="teal" isLoading={isSubmitting} type="submit">
            Add
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 55px - 50px)",
          minHeight: "-webkit-fill-available",
        }}
        py={"5"}
        px={"5"}
        overflowY={"scroll"}
        bgColor={"red"}
      >
        {children}
      </Box>
    </>
  );
};
