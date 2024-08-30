import { TodoResponse } from "../../services/todo-services";
import styles from "./TodoCard.module.scss";

interface TodoCard {
  todo: TodoResponse;
  // onUpdate: (id: number) => Promise<unknown>;
  onDelete: (id: number) => Promise<unknown>;
}

const TodoCard = ({ todo, onDelete }: TodoCard) => {
  return (
    <div key={todo.id}>
      <button>X</button>
      <div>{todo.archived}</div>
      <h4>{todo.title}</h4>
      <div>{todo.category}</div>
      <div>Updated: {todo.updatedAt}</div>
      <button>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoCard;
