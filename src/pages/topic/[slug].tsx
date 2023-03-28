import { MainLayout } from "@/components/Layout/MainLayout";
import { Box, Button, Checkbox, Heading, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import { FC } from "react";
import { useRouter } from "next/router";
import { TopicLayout } from "@/components/Layout/TopicLayout";
import { useTopic, UUID } from "@/hooks/useTopic";
import { useTask } from "@/hooks/useTask";

export default function TopicTodoList() {
  const router = useRouter();
  const { slug } = router.query;
  const { findTopic } = useTopic();
  const { tasks } = useTask();
  const topic = findTopic(slug as UUID);
  return (
    <TopicLayout>
      <Heading as={"h2"} size={"md"} mb={4}>
        {topic.title}
      </Heading>

      <Stack spacing={5} direction="column">
        {tasks.map((task) => (
          <Checkbox key={task.id} checked={task.done}>
            {task.content}
          </Checkbox>
        ))}
      </Stack>
    </TopicLayout>
  );
}
