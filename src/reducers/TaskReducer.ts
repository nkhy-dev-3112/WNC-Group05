import { TaskAction } from "../actions/TaskAction";
import { TaskActionType } from "../enums/TaskActionType";
import { TaskState } from "../states/TaskState";

export const TaskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  const sortTasks = (tasks: TaskState["tasks"]) =>
    tasks.sort((a, b) => Number(a.completed) - Number(b.completed));

  switch (action.type) {
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
