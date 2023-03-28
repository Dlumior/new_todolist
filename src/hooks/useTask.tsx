import { UUID } from "@/hooks/useTopic";
import { createContext, FC, ReactNode, Reducer, useContext, useReducer } from "react";

type Task = {
  id: UUID;
  content: string;
  done: boolean;
};

export const actionsTask = {
  ADD_TASK: "ADD_TASK" as const,
  REMOVE_TASK: "REMOVE_TASK" as const,
  COMPLETE_TASK: "COMPLETE_TASK" as const,
};

type State = Task[];

const initialTasks: State = [
  { id: "123-123-123-123-123", content: "Example", done: false },
  { id: "111-111-111-111-111", content: "Test", done: false },
];

export type ActionRemove = {
  type: "REMOVE_TASK";
  payload: UUID;
};

export type ActionAdd = {
  type: "ADD_TASK";
  payload: Task;
};

export type ActionComplete = {
  type: "COMPLETE_TASK";
  payload: UUID;
};

export type Actions = ActionAdd | ActionRemove | ActionComplete;

const taskReducer: Reducer<State, Actions> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionsTask.ADD_TASK:
      return [...state, payload];
    case actionsTask.REMOVE_TASK:
      return state.filter((item) => item.id !== payload);
    case actionsTask.COMPLETE_TASK:
      const task = state.find((item) => item.id === payload);
      if (task) {
        task.done = true;
      }
      return state;
    default:
      throw new Error(`No case for the type ${type} found in the reducer`);
  }
};

const TaskContext = createContext({
  tasks: initialTasks,
  addTask: (task: Task) => {},
  removeTask: (id: UUID) => {},
  findTask: (id: UUID): Task => {
    return { id: "0", done: false, content: "Empty" };
  },
  completeTask: (id: UUID) => {},
});

export const TaskProvider: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const addTask = (task: Task) => {
    dispatch({
      type: actionsTask.ADD_TASK,
      payload: task,
    });
  };

  const removeTask = (id: UUID) => {
    dispatch({
      type: actionsTask.REMOVE_TASK,
      payload: id,
    });
  };

  const findTask = (id: UUID): Task => {
    const task = tasks.find((item) => item.id === id);
    if (task) return task;
    return { id: "0", done: false, content: "Empty" };
  };

  const completeTask = (id: UUID) => {
    dispatch({
      type: actionsTask.COMPLETE_TASK,
      payload: id,
    });
  };

  const value = {
    tasks,
    addTask,
    removeTask,
    findTask,
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
