import { Button, Checkbox, List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const TaskList = () => {
  return (
    <List
      bordered
      renderItem={() => (
        <List.Item actions={[<Button icon={<DeleteOutlined />} />]}>
          <Checkbox></Checkbox>
        </List.Item>
      )}
    />
  );
};
export default TaskList;
