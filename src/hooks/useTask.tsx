import { UUID } from "@/hooks/useTopic";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";

type Task = {
  id: UUID;
  content: string;
  done: boolean;
};

type TopicTasks = {
  topicId: UUID;
  tasks: Task[];
};

type TopicsTasks = TopicTasks[];

const initialTasks: TopicsTasks = [
  { topicId: "123-123-123-123-123", tasks: [{ id: "12-12-12-12-12", content: "Some things to do", done: false }] },
  { topicId: "111-111-111-111-111", tasks: [{ id: "11-11-11-11-11", content: "Hmmm", done: false }] },
];

export const useTask = () => {
  const { data: topicsTasks, setValue: setTopicsTasks } = useLocalStorage<TopicsTasks>("topicsTasks", initialTasks);

  const addTask = (topicId: UUID, task: Task) => {
    const topicTasks = topicsTasks?.find((item) => item.topicId === topicId);
    topicTasks?.tasks.push(task);
    const newTopicsTasks = topicsTasks?.filter((item) => item.topicId !== topicId);
    if (topicTasks && newTopicsTasks) {
      newTopicsTasks.push(topicTasks);
      setTopicsTasks(newTopicsTasks);
    }
  };

  const addTopicWithEmptyTasks = (topicId: UUID) => {
    setTopicsTasks((value) => {
      if (value) return [...value, { topicId: topicId, tasks: [] }];
      return [{ topicId: topicId, tasks: [] }];
    });
  };

  const removeTask = (topicId: UUID, taskId: UUID) => {
    const filteredTopicsTasks = topicsTasks?.filter((item) => item.topicId !== topicId);
    const topicTasks = topicsTasks?.find((item) => item.topicId === topicId);
    const filteredTasks = topicTasks?.tasks.filter((item) => item.id !== taskId);

    if (topicTasks && filteredTasks && filteredTopicsTasks) {
      topicTasks.tasks = filteredTasks;
      filteredTopicsTasks.push(topicTasks);
      setTopicsTasks(filteredTopicsTasks);
    }
  };

  const findTopicTasks = (topicId: UUID) => {
    return topicsTasks?.find((item) => item.topicId === topicId);
  };

  const completeTask = (topicId: UUID, taskId: UUID) => {
    const topicTasks = topicsTasks?.find((item) => item.topicId === topicId);
    const task = topicTasks?.tasks.find((item) => item.id === taskId);

    if (topicTasks && task) {
      task.done = !task.done;
      setTopicsTasks(topicsTasks);
    }
  };

  return {
    topicsTasks,
    addTask,
    addTopicWithEmptyTasks,
    removeTask,
    findTopicTasks,
    completeTask,
  };
};
