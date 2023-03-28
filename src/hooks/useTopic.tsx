import { createContext, FC, ReactNode, Reducer, useContext, useReducer } from "react";
import { f } from "@chakra-ui/toast/dist/toast.types-76829e6b";

export type UUID = string;

type Topic = {
  id: UUID;
  title: string;
  done: boolean;
};

export const actions = {
  ADD_TOPIC: "ADD_TOPIC" as const,
  REMOVE_TOPIC: "REMOVE_TOPIC" as const,
};

const initialTopics: State = [
  { id: "123-123-123-123-123", title: "Example", done: false },
  { id: "111-111-111-111-111", title: "Test", done: false },
];

type State = Topic[];

export type ActionAdd = {
  type: "ADD_TOPIC";
  payload: Topic;
};

export type ActionRemove = {
  type: "REMOVE_TOPIC";
  payload: UUID;
};

export type Actions = ActionAdd | ActionRemove;

const topicReducer: Reducer<State, Actions> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_TOPIC:
      return [...state, payload];
    case actions.REMOVE_TOPIC:
      return state.filter((topic) => topic.id !== payload);
    default:
      throw new Error(`No case for the type ${type} found in the reducer`);
  }
};

const TopicContext = createContext({
  topics: initialTopics,
  addTopic: (topic: Topic) => {},
  removeTopic: (id: UUID) => {},
  findTopic: (id: UUID): Topic => {
    return { id: "0", done: false, title: "Empty" };
  },
});

export const TopicProvider: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  const [topics, dispatch] = useReducer(topicReducer, initialTopics);

  const addTopic = (topic: Topic) => {
    dispatch({
      type: actions.ADD_TOPIC,
      payload: topic,
    });
  };

  const removeTopic = (id: UUID) => {
    dispatch({
      type: actions.REMOVE_TOPIC,
      payload: id,
    });
  };

  const findTopic = (id: UUID): Topic => {
    const topic = topics.find((topic) => topic.id === id);
    if (topic) return topic;
    else return { id: "0", done: false, title: "Not Found" };
  };

  const value = {
    topics,
    addTopic,
    removeTopic,
    findTopic,
  };
  return <TopicContext.Provider value={value}>{children}</TopicContext.Provider>;
};

export const useTopic = () => {
  const context = useContext(TopicContext);

  if (context === undefined) {
    throw new Error("useTopic must be used within TopicContext");
  }

  return context;
};
