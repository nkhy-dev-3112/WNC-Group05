import { Input } from "antd";
import { TaskActionType } from "../enums/TaskActionType";
import { useTask } from "../hooks/useTask";

const FilterTask = () => {
  const { state, dispatch } = useTask();
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: TaskActionType.SET_FILTER, payload: e.target.value });
  };

  return (
    <Input
      placeholder="Filter task"
      value={state.filter}
      onChange={handleFilterChange}
    ></Input>
  );
};

export default FilterTask;
