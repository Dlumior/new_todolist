import { useRouter } from "next/router";
import { TopicLayout } from "@/components/Layout/TopicLayout";
import { useTopic, UUID } from "@/hooks/useTopic";
import { useTask } from "@/hooks/useTask";
import { Trash } from "lucide-react";
import { Checkbox } from "@/components/Elements/ui/Checkbox";
import { Label } from "@/components/Elements/ui/Label";

export default function TopicTodoList() {
  const router = useRouter();
  const { slug } = router.query;
  const { findTopic, removeTopic } = useTopic();
  const { findTopicTasks, addTask, completeTask } = useTask();
  const topicId = slug as UUID;
  const topic = findTopic(topicId);
  const topicTasks = findTopicTasks(topicId);

  const handleAdd = (task: string) => {
    addTask(topicId, { id: window.crypto.randomUUID(), done: false, content: task });
  };
  return (
    <TopicLayout handleAdd={handleAdd}>
      <div className={"mb-10 flex items-center justify-between px-5"}>
        <div className={"flex items-center gap-3"}>
          <div className={"flex items-center"}>
            <span className={"rounded-lg bg-white px-3 py-2 text-sm text-black-950"}>{topicTasks?.tasks.length}</span>
          </div>
          <div>
            <span className={"text-2xl text-base font-medium text-white"}>{topic?.title}</span>
          </div>
        </div>
        <div>
          <button className={"rounded-full bg-white p-3"} onClick={() => removeTopic(topicId)}>
            <Trash className={"text-black-950"} size={16} />
          </button>
        </div>
      </div>

      <div className={"h-full rounded-t-3xl bg-primary-200 px-5 pt-10 text-black-950"}>
        <ul>
          {topicTasks?.tasks?.map((task) => (
            <li key={task.id} className={"flex items-center py-2"}>
              <div className={"flex items-center gap-3"}>
                <Checkbox id={task.id} checked={task.done} onCheckedChange={() => completeTask(topicId, task.id)} />
                <label
                  htmlFor={task.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {task.content}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </TopicLayout>
  );
}
