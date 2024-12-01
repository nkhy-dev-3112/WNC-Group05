import { createContext, ReactNode, useReducer } from "react";
import { TaskReducer } from "../reducers/TaskReducer";
import { TaskState } from "../states/TaskState";

const initialState: TaskState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  filter: "",
};

const TaskContext = createContext<any>(null);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(TaskReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
