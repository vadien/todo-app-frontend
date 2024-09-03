import { useState, useEffect } from "react";
import { TodoFormData } from "../../components/TodoForm/schema";
import TodoForm from "../../components/TodoForm/TodoForm";
import {
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
  const [error, setError] = useState<Error | null>(null);

  const onTodoSubmit = async (data: TodoFormData) => {
    createTodo(data)
      .then((data) => {
        setTodos(todoSort([data, ...todos]));
      })
      .catch((e) => setError(e));
  };

  const onTodoComplete = () => {
    console.log("Todo complete!");
    getAllTodos()
      .then((data) => {
        setTodos(todoSort(data));
      })
      .catch((error) => setError(error));
  };

  const todoSort = (data: TodoResponse[]) => {
    const sortedData = data.sort((a, b) => {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    });
    return sortedData;
  };

  useEffect(() => {
    getAllTodos()
      .then((data) => {
        setTodos(todoSort(data));
      })
      .catch((error) => setError(error));
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => setError(error));
  }, []);

  const onDelete = async (id: number, completed: boolean) => {
    if (!completed && !confirm("Delete incomplete task?")) {
      return;
    } else {
      const isDeleted = await deleteTodoById(id).catch((e: any) => {
        setError(e);
        return false;
      });
      if (isDeleted) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      }
    }
  };

  return (
    <>
      {error && <h1 className={styles.Error}>Error: {error.message}</h1>}
      <div className={styles.TodoListContainer}>
        <TodoForm onTodoSubmit={onTodoSubmit} categories={categories} />
        {/* {!todos.length && !error && <h3>Relax! You're all caught up.</h3>} */}
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
    </>
  );
};

export default TodoListContainer;
