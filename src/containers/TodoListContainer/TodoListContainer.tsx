import { TodoFormData } from "../../components/TodoForm/schema";
import TodoForm from "../../components/TodoForm/TodoForm";
import TodoContentLoader from "../TodoContentLoader/TodoContentLoader";

const TodoListContainer = () => {
  const onSubmit = (data: TodoFormData) => console.log(data);

  return (
    <div>
      <div className="titleText">TODO</div>
      <TodoForm onSubmit={onSubmit} />
      <TodoContentLoader />
    </div>
  );
};

export default TodoListContainer;
