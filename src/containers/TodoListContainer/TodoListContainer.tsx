import { useState, useEffect } from "react";
import { TodoFormData } from "../../components/TodoForm/schema";
import TodoForm from "../../components/TodoForm/TodoForm";
import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  TodoResponse,
} from "../../services/todo-services";
import TodoCard from "../../components/TodoCard/TodoCard";

const TodoListContainer = () => {
  const [todos, setTodos] = useState<TodoResponse[]>([]);

  const onSubmit = async (data: TodoFormData) => {
    createTodo(data).catch((e) => console.log(e));
  };

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
      <div className="titleText">TODO</div>
      <TodoForm onSubmit={onSubmit} />
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodoListContainer;
