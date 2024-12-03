import { createContext, ReactNode, useReducer } from "react";
import { TaskReducer } from "../stores/reducers";
import { Task, TaskState } from "../types";
import { TaskActionType } from "../stores/actionTypes";

const saveToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const initialState: TaskState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  filter: "",
};


const TaskContext = createContext<any>(null);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const addTask = (taskName: string) => {
    if (taskName.trim()) {
      const newTask: Task = {
        id: Date.now(),
        name: taskName,
        completed: false,
      };
      saveToLocalStorage([...state.tasks, newTask])
      dispatch({ type: TaskActionType.ADD_TASK, payload: newTask });
    }
  };

  const editTaskName = (id: number, newName: string) => {
    saveToLocalStorage(state.tasks.map((task) =>
      task.id === id
        ? { ...task, name: newName }
        : task
    ))
    dispatch({
      type: TaskActionType.EDIT_TASK_NAME,
      payload: { id, name: newName },
    });

  };

  const toggleComplete = (id: number) => {
    dispatch({ type: TaskActionType.TOGGLE_COMPLETE, payload: id });
  };

  const removeTask = (id: number) => {
    saveToLocalStorage(state.tasks.filter(task => task.id !== id))
    dispatch({ type: TaskActionType.REMOVE_TASK, payload: id });
  };

  const removeAllTasks = () => {
    saveToLocalStorage([])
    dispatch({ type: TaskActionType.REMOVE_ALL_TASKS });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: TaskActionType.SET_FILTER, payload: e.target.value });
  };

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        addTask,
        editTaskName,
        removeTask,
        removeAllTasks,
        toggleComplete,
        handleFilterChange,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
