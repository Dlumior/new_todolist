import { useRouter } from "next/router";
import { TopicLayout } from "@/components/Layout/TopicLayout";
import { useTopic, UUID } from "@/hooks/useTopic";
import { useTask } from "@/hooks/useTask";

export default function TopicTodoList() {
  const router = useRouter();
  const { slug } = router.query;
  const { findTopic } = useTopic();
  const { findTopicTasks, completeTask, addTask } = useTask();
  const topicId = slug as UUID;
  const topic = findTopic(topicId);
  const topicTasks = findTopicTasks(topicId);

  const handleAdd = (task: string) => {
    addTask(topicId, { id: window.crypto.randomUUID(), done: false, content: task });
  };
  return (
    <TopicLayout handleAdd={handleAdd}>
      <p className={"text-base"}>{topic.title}</p>

      <div>
        {topicTasks.tasks.map((task) => (
          <div key={task.id}>{task.content}</div>
        ))}
      </div>
    </TopicLayout>
  );
}
