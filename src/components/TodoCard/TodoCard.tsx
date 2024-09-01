import { useState } from "react";
import {
  archiveTodoById,
  TodoResponse,
  updateTodoById,
} from "../../services/todo-services";
import { TodoFormData } from "../TodoForm/schema";
import styles from "./TodoCard.module.scss";
import TodoForm from "../TodoForm/TodoForm";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CategoryResponse } from "../../services/category-services";
dayjs.extend(relativeTime);

interface TodoCard {
  todo: TodoResponse;
  onTodoComplete: (id: number) => unknown;
  onDelete: (id: number) => unknown;
  categories: CategoryResponse[];
}

const TodoCard = ({ todo, onTodoComplete, onDelete, categories }: TodoCard) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = (data: TodoFormData) => {
    console.log(data);
    updateTodoById(todo.id, data)
      .then(() => setEditMode(false))
      .catch((e: Error) => setError(e));
  };

  return (
    <>
      <div key={todo.id} className={styles.TodoCard}>
        <button
          className={styles.checkmark}
          onClick={() =>
            onSubmit({
              title: todo.title,
              categoryId: todo.category.id,
              isArchived: true,
            })
          }
        >
          X
        </button>
        <div className={styles.todoTitle}>{todo.title}</div>
        <div className={styles.todoCategory}>{todo.category.name}</div>
        <div className={styles.todoTimer}>
          {dayjs(todo.updatedAt).fromNow()}
        </div>
        <button
          className={styles.changeButton}
          onClick={() => setEditMode(!editMode)}
        >
          Edit
        </button>
        <button
          className={styles.changeButton}
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
      <div>
        {editMode && (
          <TodoForm
            onTodoSubmit={onSubmit}
            formType="EDIT"
            categories={categories}
            defaultValues={{
              title: todo.title,
              categoryId: todo.category.id,
              isArchived: false,
            }}
          />
        )}
      </div>
    </>
  );
};

export default TodoCard;
