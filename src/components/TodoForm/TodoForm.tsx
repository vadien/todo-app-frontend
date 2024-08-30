import { useForm } from "react-hook-form";
import { TodoFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => unknown;
}

const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<TodoFormData>({ resolver: zodResolver(schema) });

  isSubmitSuccessful && reset();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Todo: </label>
        <input id="title" type="text" {...register("title")} />
        {errors?.title && <small>{errors.title.message}</small>}
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input id="category" type="text" {...register("category")} />
        {errors?.category && <small>{errors.category.message}</small>}
      </div>
      <button>Create todo</button>
    </form>
  );
};

export default TodoForm;
