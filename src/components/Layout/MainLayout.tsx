import { Dispatch, FC, ReactNode } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { ActionAdd, ActionKind, ActionRemove } from "@/pages";
import { CustomModal } from "@/components/Elements/CustomModal";

type MainLayoutProps = {
  children: ReactNode;
  handleAdd: Dispatch<ActionAdd | ActionRemove>;
};
export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children, handleAdd } = props;
  return (
    <>
      <Box h={"50px"} bgColor={"moccasin"} display={"flex"} alignItems={"center"} p={2}>
        <Text>SKYA - TODO LIST</Text>
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 50px - 50px)",
        }}
        py={"5"}
        px={"2"}
        overflowY={"scroll"}
        bgColor={"red"}
      >
        {children}
      </Box>
      <Box h={"50px"} bgColor={"aqua"} display={"flex"} p={2} justifyContent={"center"}>
        <CustomModal handleAdd={handleAdd} />
      </Box>
    </>
  );
};
