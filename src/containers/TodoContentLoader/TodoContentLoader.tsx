import { useEffect, useState } from "react";
import InfoBar from "../../components/InfoBar/InfoBar";
import {
  deleteTodoById,
  getAllTodos,
  TodoResponse,
} from "../../services/todo-services";
import TodoCard from "../../components/TodoCard/TodoCard";

const TodoContentLoader = () => {
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  useEffect(() => {
    getAllTodos()
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
  }, []);

  const onDelete = async (id: number) => {
    const isDeleted = await deleteTodoById(id).catch((e: any) => {
      console.log(e);
      return false;
    });
    if (isDeleted) {
      const currentTodos = todos.filter((todo) => todo.id !== id);
      setTodos(currentTodos);
    }
  };

  return (
    <div>
      Todo Cards go here
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
      <InfoBar />
    </div>
  );
};

export default TodoContentLoader;
