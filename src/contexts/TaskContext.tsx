import { createContext, ReactNode, useReducer } from "react";
import { TaskReducer } from "../reducers/TaskReducer";
import { TaskState } from "../states/TaskState";
import { Task } from "../models/Task";
import { TaskActionType } from "../enums/TaskActionType";

const initialState: TaskState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  filter: "",
};

const TaskContext = createContext<any>(null);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(TaskReducer, initialState);
  // Migrate addTask logic here
  const addTask = (taskName: string) => {
    if (taskName.trim()) {
      const newTask: Task = {
        id: Date.now(),
        name: taskName,
        completed: false,
      };
      dispatch({ type: TaskActionType.ADD_TASK, payload: newTask });
    }
  };
  return (
    <TaskContext.Provider value={{ state, dispatch, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
