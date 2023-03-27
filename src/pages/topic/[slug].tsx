import { MainLayout } from "@/components/Layout/MainLayout";
import { Box, Button, Checkbox, Heading, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import { FC } from "react";
import { useRouter } from "next/router";
import { TopicLayout } from "@/components/Layout/TopicLayout";

export default function TopicTodoList() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <TopicLayout>
      <Heading as={"h2"} size={"md"}>
        {slug}
      </Heading>

      <Stack spacing={5} direction="column">
        <Checkbox>Checkbox</Checkbox>
        <Checkbox defaultChecked>Checkbox</Checkbox>
      </Stack>
    </TopicLayout>
  );
}
