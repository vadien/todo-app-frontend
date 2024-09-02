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
  Circle,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";
dayjs.extend(relativeTime);

interface TodoCard {
  todo: TodoResponse;
  onTodoComplete: (id: number) => unknown;
  onDelete: (id: number) => unknown;
  categories: CategoryResponse[];
}

const TodoCard = ({ todo, onDelete, categories }: TodoCard) => {
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
              archived: true,
            })
          }
        >
          {todo.archived ? <CheckCircle size={32} /> : <Circle size={32} />}
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
          <PencilSimple size={32} />
        </button>
        <button
          className={styles.changeButton}
          onClick={() => onDelete(todo.id)}
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
              archived: false,
            }}
          />
        )}
      </div>
    </>
  );
};

export default TodoCard;
