import React, { createContext, ReactNode, useReducer } from "react";
import { TaskState } from "../states/TaskState";
import { TaskReducer } from "../reducers/TaskReducer";

const initialState: TaskState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  filter: "",
};

export const TaskContext = createContext<any>(null);

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
