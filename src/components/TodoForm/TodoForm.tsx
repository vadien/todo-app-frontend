import { useForm } from "react-hook-form";
import { TodoFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

type FormType = "CREATE" | "EDIT";

interface TodoFormProps {
  formType?: FormType;
  onSubmit: (data: TodoFormData) => unknown;
  defaultValues?: TodoFormData;
}

const TodoForm = ({
  formType = "CREATE",
  defaultValues = { title: "", category: "" },
  onSubmit,
}: TodoFormProps) => {
  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<TodoFormData>({ resolver: zodResolver(schema), defaultValues });

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
