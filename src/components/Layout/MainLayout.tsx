import { FC, ReactNode } from "react";
import { Input } from "@/components/Elements/ui/Input";
import { Button } from "@/components/Elements/ui/Button";

type MainLayoutProps = {
  children: ReactNode;
  handleAdd?: any;
};
export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <div
        className={"sticky top-0 flex h-[50px] items-center bg-primary-200 px-5 py-2 shadow-2xl shadow-primary-200/30"}
      >
        <p className={"text-base"}>SKYA - TODO LIST</p>
      </div>
      <div
        className={
          "sticky top-[50px] flex w-full items-center justify-center space-x-2 bg-black-700 px-5 py-5" + " text-white"
        }
      >
        <Input placeholder="Add new topic" />
        <Button variant={"outline"}>Add</Button>
      </div>
      <div className={"h-screen bg-black-700 px-5 pt-5 text-white"}>{children}</div>
    </>
  );
};
