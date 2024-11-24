import { Button } from "antd";
import AddTask from "../components/AddTask";
import FilterTask from "../components/FilterTask";
import TaskList from "../components/TaskList";
import Title from "antd/es/typography/Title";

const TodoPage: React.FC = () => {
  return (
    <div
      style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}
    >
      <Title
        level={2}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        Todo App
      </Title>
      <FilterTask />
      <AddTask />
      <TaskList />
      <Button danger type="link">
        Remove All Tasks
      </Button>
    </div>
  );
};

export default TodoPage;
