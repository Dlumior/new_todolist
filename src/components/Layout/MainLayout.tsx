import { FC, ReactNode } from "react";
import { Input } from "@/components/Elements/ui/Input";
import { Button } from "@/components/Elements/ui/Button";
import { useForm } from "react-hook-form";

type MainLayoutProps = {
  children: ReactNode;
  handleAdd?: (text: string) => void;
};

type FormData = {
  text: string;
};
export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children, handleAdd } = props;
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (handleAdd) {
      handleAdd(data.text);
    }
  };

  return (
    <>
      <div
        className={
          "sticky top-0 flex h-[50px] items-center justify-between bg-primary-200 px-5 py-2" +
          " shadow-2xl" +
          " shadow-primary-200/30"
        }
      >
        <div>
          <p className={"text-base"}>SKYA - TODO LIST</p>
        </div>
        <div>
          <Button size={"sm"} variant={"secondary"} onClick={() => localStorage.clear()} type={"button"}>
            Clear
          </Button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          "sticky top-[50px] flex w-full items-center justify-center space-x-2 bg-black-700 px-5 py-5" + " text-white"
        }
      >
        <Input autoComplete={"off"} placeholder="Add new topic" {...register("text")} />
        <Button type={"submit"} variant={"outline"}>
          Add
        </Button>
      </form>
      <div className={"h-screen bg-black-700 px-5 pt-5 text-white"}>{children}</div>
    </>
  );
};
