import { Button, Input } from "antd";

const AddTask = () => {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "20px",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      <Input placeholder="Add a new task"></Input>
      <Button type="primary">Add Task</Button>
    </div>
  );
};

export default AddTask;
