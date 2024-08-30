import { TodoFormData } from "../../components/TodoForm/schema";
import TodoForm from "../../components/TodoForm/TodoForm";
import { createTodo } from "../../services/todo-services";
import TodoContentLoader from "../TodoContentLoader/TodoContentLoader";

const TodoListContainer = () => {
  const onSubmit = async (data: TodoFormData) => {
    createTodo(data).catch((e) => console.log(e));
  };

  return (
    <div>
      <div className="titleText">TODO</div>
      <TodoForm onSubmit={onSubmit} />
      <TodoContentLoader />
    </div>
  );
};

export default TodoListContainer;
