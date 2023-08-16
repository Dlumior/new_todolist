import { useRouter } from "next/router";
import { TopicLayout } from "@/components/Layout/TopicLayout";
import { useTopic, UUID } from "@/hooks/useTopic";
import { useTask } from "@/hooks/useTask";
import { Mail, Trash } from "lucide-react";
import { mutate } from "swr";
import { Checkbox } from "@/components/Elements/ui/Checkbox";
import useSWR from "swr";
import { Label } from "@/components/Elements/ui/Label";
import { getTopic, deleteTopic, TOPIC_ENDPOINT as cacheKey } from "@/services/topic.services";
import { poolTaskEndpoint } from "@/services/topics.services";
import { sendMail } from "@/services/sendMail.services";

export default function TopicTodoList() {
  const router = useRouter();
  const { slug } = router.query;
  const { findTopic, removeTopic } = useTopic();
  const { findTopicTasks, addTask, completeTask } = useTask();
  const topicId = slug as string;
  const topic = findTopic(topicId);
  const topicTasks = findTopicTasks(topicId);

  const { isLoading, error, data, mutate } = useSWR(cacheKey, () => getTopic({ topicId: topicId ?? "" }));

  const handleAdd = (task: string) => {
    addTask(topicId, { id: window.crypto.randomUUID(), done: false, content: task });
  };

  return (
    <TopicLayout handleAdd={handleAdd}>
      <div className={"mb-10 flex items-center justify-between px-5"}>
        <div className={"flex items-center gap-3"}>
          <div className={"flex items-center"}>
            <span className={"rounded-lg bg-white px-3 py-2 text-sm text-black-950"}>{data?.tasks?.length}</span>
          </div>
          <div>
            <span className={"text-2xl font-medium text-white"}>{data?.name}</span>
          </div>
        </div>
        <div>
          <button
            className={"mr-2 rounded-full bg-white p-3"}
            onClick={() => {
              sendMail({ topicId });
            }}
          >
            <Mail className={"text-black-950"} size={16} />
          </button>
          <button
            className={"rounded-full bg-white p-3"}
            onClick={() => {
              deleteTopic({ topicId });
              mutate(poolTaskEndpoint);
              router.push("/topic");
            }}
          >
            <Trash className={"text-black-950"} size={16} />
          </button>
        </div>
      </div>

      <div className={"h-full rounded-t-3xl bg-primary-200 px-5 pt-10 text-black-950"}>
        <ul>
          {data?.tasks?.map((task) => (
            <li key={task} className={"flex items-center py-2"}>
              <div className={"flex items-center gap-3"}>
                {/*<Checkbox id={task.id} checked={task.done} onCheckedChange={() => completeTask(topicId, task.id)} /> */}
                <label
                  htmlFor={task}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {task}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </TopicLayout>
  );
}
