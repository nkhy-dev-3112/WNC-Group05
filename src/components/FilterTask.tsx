import React, { useContext } from "react";
import { Input } from "antd";
import TaskContext from "../contexts/TaskContext";

const FilterTask: React.FC = () => {
  const { state, handleFilterChange } = useContext(TaskContext);

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
