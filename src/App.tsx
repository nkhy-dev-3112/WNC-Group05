import { TaskProvider } from "./contexts/TaskContext";
import TodoPage from "./pages/TodoPage";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <TodoPage />
    </TaskProvider>
  );
};

export default App;
