import React from "react";
import { Input } from "antd";
import { TaskActionType } from "../enums/TaskActionType";
import { useTask } from "../hooks/useTask";

const FilterTask: React.FC = () => {
  const { state, dispatch } = useTask();
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: TaskActionType.SET_FILTER, payload: e.target.value });
  };

  return (
    <Input
      placeholder="Filter tasks by name"
      value={state.filter}
      onChange={handleFilterChange}
      style={{ marginBottom: "20px" }}
    />
  );
};

export default FilterTask;
