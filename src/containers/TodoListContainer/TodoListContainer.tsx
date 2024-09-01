import { useState, useEffect } from "react";
import { TodoFormData } from "../../components/TodoForm/schema";
import TodoForm from "../../components/TodoForm/TodoForm";
import {
  archiveTodoById,
  createTodo,
  deleteTodoById,
  getAllTodos,
  TodoResponse,
} from "../../services/todo-services";
import {
  CategoryResponse,
  getAllCategories,
} from "../../services/category-services";
import TodoCard from "../../components/TodoCard/TodoCard";
import styles from "./TodoListContainer.module.scss";

const TodoListContainer = () => {
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [stateChanged, setStateChanged] = useState<boolean>(false);

  const onTodoSubmit = async (data: TodoFormData) => {
    createTodo(data)
      .then((data) => setTodos([...todos, data]))
      .catch((e) => console.log(e));
  };

  const onTodoComplete = (id: number) => {
    archiveTodoById(id)
      .then((data) => {
        const currentTodos = todos.filter((todo) => todo.id !== data.id);
        setTodos([...currentTodos, data]);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getAllTodos()
      .then((data) => setTodos(data))
      .catch((error) => console.log(error));
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setStateChanged(false);
  }, [stateChanged]);

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
    <div className={styles.TodoListContainer}>
      <TodoForm onTodoSubmit={onTodoSubmit} categories={categories} />
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onTodoComplete={onTodoComplete}
          onDelete={onDelete}
          categories={categories}
        />
      ))}
    </div>
  );
};

export default TodoListContainer;
