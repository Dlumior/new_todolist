import { UUID } from "@/hooks/useTopic";
import { createContext, FC, ReactNode, Reducer, useContext, useReducer } from "react";

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

export const actionsTask = {
  ADD_TASK: "ADD_TASK" as const,
  REMOVE_TASK: "REMOVE_TASK" as const,
  COMPLETE_TASK: "COMPLETE_TASK" as const,
};

type State = TopicsTasks;

const initialTasks: State = [
  { topicId: "123-123-123-123-123", tasks: [{ id: "12-12-12-12-12", content: "Some things to do", done: false }] },
  { topicId: "111-111-111-111-111", tasks: [{ id: "11-11-11-11-11", content: "Hmmm", done: false }] },
];

export type ActionRemove = {
  type: "REMOVE_TASK";
  payload: { topicId: UUID; taskId: UUID };
};

export type ActionAdd = {
  type: "ADD_TASK";
  payload: { topicId: UUID; task: Task };
};

export type ActionComplete = {
  type: "COMPLETE_TASK";
  payload: { topicId: UUID; taskId: UUID };
};

export type Actions = ActionAdd | ActionRemove | ActionComplete;

const taskReducer: Reducer<State, Actions> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionsTask.ADD_TASK:
      state.find((item) => item.topicId === payload.topicId)?.tasks.push(payload.task);

      return state;
    case actionsTask.REMOVE_TASK:
      const taskFiltered = state.find((item) => item.topicId === payload.topicId);
      const newTasks = taskFiltered?.tasks.filter((task) => task.id !== payload.taskId);

      if (taskFiltered && newTasks) taskFiltered.tasks = newTasks;
      return [...state];
    case actionsTask.COMPLETE_TASK:
      const topicTasks = state.find((item) => item.topicId === payload.topicId);
      if (topicTasks) {
        const auxTask = topicTasks.tasks.find((item) => item.id === payload.taskId);
        if (auxTask) auxTask.done = true;
      }
      return [...state];
    default:
      throw new Error(`No case for the type ${type} found in the reducer`);
  }
};

const TaskContext = createContext({
  topicsTasks: initialTasks,
  addTask: (topicId: UUID, task: Task) => {},
  removeTask: (topicId: UUID, taskId: UUID) => {},
  findTopicTasks: (topicId: UUID): TopicTasks => {
    return { topicId: "0", tasks: [] };
  },
  completeTask: (topicId: UUID, taskId: UUID) => {},
});

export const TaskProvider: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  const [topicsTasks, dispatch] = useReducer(taskReducer, initialTasks);

  const addTask = (topicId: UUID, task: Task) => {
    dispatch({
      type: actionsTask.ADD_TASK,
      payload: { topicId, task },
    });
  };

  const removeTask = (topicId: UUID, taskId: UUID) => {
    dispatch({
      type: actionsTask.REMOVE_TASK,
      payload: { topicId, taskId },
    });
  };

  const findTopicTasks = (topicId: UUID): TopicTasks => {
    const task = topicsTasks.find((item) => item.topicId === topicId);
    if (task) return task;
    return { topicId: "0", tasks: [] };
  };

  const completeTask = (topicId: UUID, taskId: UUID) => {
    dispatch({
      type: actionsTask.COMPLETE_TASK,
      payload: { topicId, taskId },
    });
  };

  const value = {
    topicsTasks,
    addTask,
    removeTask,
    findTopicTasks,
    completeTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error("useTask must be used within TopicContext");
  }

  return context;
};
