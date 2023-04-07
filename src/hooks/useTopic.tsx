import { createContext, FC, ReactNode, Reducer, useContext, useReducer } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useTask } from "@/hooks/useTask";
import { useRouter } from "next/router";

export type UUID = string;

type Topic = {
  id: UUID;
  title: string;
  done: boolean;
};

const initialTopics: Topic[] = [
  { id: "123-123-123-123-123", title: "Example", done: false },
  { id: "111-111-111-111-111", title: "Test", done: false },
];

export const useTopic = () => {
  const router = useRouter();
  const { data: topics, setValue: setTopics } = useLocalStorage<Topic[]>("topics", initialTopics);
  const { addTopicWithEmptyTasks } = useTask();

  const addTopic = (topic: Topic) => {
    setTopics((value) => (value ? [...value, topic] : [topic]));
    addTopicWithEmptyTasks(topic.id);
  };

  const removeTopic = (id: UUID) => {
    const newTopics = topics ? topics.filter((topic) => topic.id !== id) : topics;
    setTopics(newTopics);
    router.push("/");
  };

  const findTopic = (id: UUID) => {
    return topics ? topics.find((topic) => topic.id === id) : null;
  };

  return {
    topics,
    addTopic,
    removeTopic,
    findTopic,
  };
};
