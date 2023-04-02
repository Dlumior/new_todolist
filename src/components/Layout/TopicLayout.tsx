import { FC, ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTask } from "@/hooks/useTask";
import { Button } from "@/components/Elements/ui/Button";
import { Input } from "@/components/Elements/ui/Input";

type TopicLayoutProps = {
  children: ReactNode;
  handleAdd: (task: string) => void;
};

type FormData = {
  task: string;
};
export const TopicLayout: FC<TopicLayoutProps> = (props) => {
  const { children, handleAdd } = props;
  const { addTask } = useTask();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  function onSubmit(values: FormData) {
    handleAdd(values.task);
  }

  useEffect(() => {
    reset({ task: "" });
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <div className={"sticky top-0 flex h-[50px] items-center bg-blue-700 p-2"}>
        <p className={"text-base"}>SKYA - TODO LIST</p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"flex h-[50px] w-full w-full max-w-sm items-center space-x-2 px-5"}
        >
          <Input
            id="task"
            placeholder="Add new task"
            autoComplete="off"
            {...register("task", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <Button variant={"destructive"} size={"sm"}>
            Add
          </Button>
        </form>
      </div>
      <div className={"border-y-green-700"}>{children}</div>
    </>
  );
};
