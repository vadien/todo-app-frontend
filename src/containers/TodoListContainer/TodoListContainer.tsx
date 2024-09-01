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

const TodoListContainer = () => {
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  const onTodoSubmit = async (data: TodoFormData) => {
    console.log(data);
    createTodo(data)
      // .then((data) => setTodos([...todos, data]))
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

  // useEffect(() => {
  //   getAllCategories()
  //     .then((data) => setCategories(data))
  //     .catch((error) => console.log(error));
  // }, []);

  console.log(todos);

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
      <TodoForm onTodoSubmit={onTodoSubmit} categories={categories} />
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          categories={categories}
        />
      ))}
    </div>
  );
};

export default TodoListContainer;
