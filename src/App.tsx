import { useEffect } from "react";
import TodoListContainer from "./containers/TodoListContainer/TodoListContainer";
import { getAllTodos } from "./services/todo-services";

function App() {
  console.log(import.meta.env.VITE_APP_API_BASE_URL);
  useEffect(() => {
    getAllTodos().then(console.log).catch(console.error);
  });
  return (
    <>
      <h1>Hello World!</h1>
      <TodoListContainer />
    </>
  );
}

export default App;
