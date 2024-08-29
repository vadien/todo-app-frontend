import TodoForm from "../../components/TodoForm/TodoForm";
import TodoContentLoader from "../TodoContentLoader/TodoContentLoader";

const TodoListContainer = () => {
  return (
    <div>
      <div className="titleText">TODO</div>
      <TodoForm />
      <TodoContentLoader />
    </div>
  );
};

export default TodoListContainer;
