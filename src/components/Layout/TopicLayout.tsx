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
      <div
        className={"sticky top-0 flex h-[50px] items-center bg-primary-200 px-5 py-2 shadow-2xl shadow-primary-200/30"}
      >
        <p className={"font-bold text-slate-950"}>Bezzy</p>
      </div>
      {/* <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          "sticky top-[50px] flex w-full items-center justify-center space-x-2 bg-slate-800 px-5 py-5" + " text-white"
        }
      >
        <Input
          id="task"
          placeholder="Add new task"
          disabled={isSubmitting}
          autoComplete="off"
          {...register("task", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <Button type={"submit"} variant={"outline"} size={"default"} disabled={isSubmitting}>
          Add
        </Button>
      </form> */}
      <div className={"h-screen bg-slate-800 pt-5 text-white"}>{children}</div>
    </>
  );
};
