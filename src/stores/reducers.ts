import { TaskAction } from "./actions";
import { TaskActionType } from "./actionTypes";
import { TaskState } from "../types";

export const TaskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  const sortTasks = (tasks: TaskState["tasks"]) =>
    tasks.sort((a, b) => Number(a.completed) - Number(b.completed));

  switch (action.type) {
    case TaskActionType.SET_FILTER:
      return { ...state, filter: action.payload };

    case TaskActionType.ADD_TASK:
      return { ...state, tasks: sortTasks([...state.tasks, action.payload]) };

    case TaskActionType.TOGGLE_COMPLETE:
      return {
        ...state,
        tasks: sortTasks(
          state.tasks.map((task) =>
            task.id === action.payload
              ? { ...task, completed: !task.completed }
              : task
          )
        ),
      };

    case TaskActionType.REMOVE_TASK:
      return {
        ...state,
        tasks: sortTasks(
          state.tasks.filter((task) => task.id !== action.payload)
        ),
      };

    case TaskActionType.REMOVE_ALL_TASKS:
      return { ...state, tasks: [] };

    case TaskActionType.EDIT_TASK_NAME:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, name: action.payload.name }
            : task
        ),
      };
    default:
      return state;
  }
};
