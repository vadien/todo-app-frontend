import { useState } from "react";
import { TodoResponse, updateTodoById } from "../../services/todo-services";
import { TodoFormData } from "../TodoForm/schema";
import styles from "./TodoCard.module.scss";
import TodoForm from "../TodoForm/TodoForm";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CategoryResponse } from "../../services/category-services";
dayjs.extend(relativeTime);

interface TodoCard {
  todo: TodoResponse;
  onDelete: (id: number) => unknown;
  categories: CategoryResponse[];
}

const TodoCard = ({ todo, onDelete, categories }: TodoCard) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = (data: TodoFormData) => {
    updateTodoById(todo.id, data)
      .then(() => setEditMode(false))
      .catch((e: Error) => setError(e));
  };

  return (
    <>
      <div key={todo.id}>
        <button>X</button>
        <div>{todo.archived}</div>
        <h4>{todo.title}</h4>
        <div>{todo.category.name}</div>
        <div>Updated: {dayjs(todo.updatedAt).fromNow()}</div>
        <button onClick={() => setEditMode(true)}>Edit</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
      <div>
        {editMode && (
          <TodoForm
            onTodoSubmit={onSubmit}
            formType="EDIT"
            categories={categories}
            defaultValues={{ title: todo.title, categoryId: todo.category.id }}
          />
        )}
      </div>
    </>
  );
};

export default TodoCard;
