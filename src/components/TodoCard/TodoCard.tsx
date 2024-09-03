import { useState } from "react";
import { TodoResponse, updateTodoById } from "../../services/todo-services";
import { TodoFormData } from "../TodoForm/schema";
import styles from "./TodoCard.module.scss";
import TodoForm from "../TodoForm/TodoForm";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CategoryResponse } from "../../services/category-services";
import {
  CheckCircle,
  CheckSquare,
  Circle,
  PencilSimple,
  Square,
  Trash,
} from "@phosphor-icons/react";
dayjs.extend(relativeTime);

interface TodoCard {
  todo: TodoResponse;
  onTodoComplete: (data: TodoResponse) => unknown;
  onDelete: (id: number, archived: boolean) => unknown;
  categories: CategoryResponse[];
}

const TodoCard = ({ todo, onTodoComplete, onDelete, categories }: TodoCard) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = (data: TodoFormData) => {
    updateTodoById(todo.id, data)
      .then((response) => {
        setEditMode(false);
        onTodoComplete(response);
      })
      .catch((e: Error) => setError(e));
  };

  return (
    <>
      {error && <div className={styles.errDisplay}>{error.message}</div>}
      <div
        key={todo.id}
        className={
          todo.completed
            ? `${styles.TodoCard} ${styles.TodoCardCompleted}`
            : styles.TodoCard
        }
      >
        <button
          className={styles.checkmark}
          onClick={() =>
            onSubmit({
              title: todo.title,
              categoryId: todo.category.id,
              completed: !todo.completed,
            })
          }
        >
          {todo.completed ? <CheckSquare size={32} /> : <Square size={32} />}
        </button>
        <div className={styles.todoTitle}>{todo.title}</div>
        <div className={styles.todoCategory}>{todo.category.name}</div>
        <div className={styles.todoTimer}>
          {dayjs(todo.updatedAt).fromNow()}
        </div>
        <button
          className={styles.changeButton}
          onClick={() => setEditMode(!editMode)}
          disabled={todo.completed}
        >
          <PencilSimple size={32} />
        </button>
        <button
          className={styles.changeButton}
          onClick={() => onDelete(todo.id, todo.completed)}
        >
          <Trash size={32} />
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
              completed: false,
            }}
          />
        )}
      </div>
    </>
  );
};

export default TodoCard;
