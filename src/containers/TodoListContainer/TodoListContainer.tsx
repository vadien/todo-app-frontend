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
  const [currentTodos, setCurrentTodos] = useState<TodoResponse[]>([]);
  const [archivedTodos, setArchivedTodos] = useState<TodoResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  const onTodoSubmit = async (data: TodoFormData) => {
    createTodo(data)
      .then((data) => {
        const updatedTodos = todos.filter((todo) => todo.archived !== true);
        setCurrentTodos([data, ...updatedTodos]);
      })
      .catch((e) => console.log(e));
  };

  const onTodoComplete = (data: TodoResponse) => {
    if (data.archived) {
      const archivedTodos = todos.filter((todo) => todo.archived == true);
      setArchivedTodos([...archivedTodos, data]);
    } else {
      setCurrentTodos([data, ...todos]);
    }
  };

  useEffect(() => {
    getAllTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => console.log(error));
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setCurrentTodos(todos.filter((todo) => todo.archived !== true));
    setArchivedTodos(todos.filter((todo) => todo.archived == true));
  }, [todos]);

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

  // console.log("current render");
  // console.log(currentTodos);
  // console.log(archivedTodos);

  return (
    <>
      <h3>{!todos.length && "Relax! You're all caught up."}</h3>
      <div className={styles.TodoListContainer}>
        <TodoForm onTodoSubmit={onTodoSubmit} categories={categories} />
        {currentTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onTodoComplete={onTodoComplete}
            onDelete={onDelete}
            categories={categories}
          />
        ))}
      </div>
      <div className={styles.archiveContainer}>
        {archivedTodos.map((todo) => (
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
