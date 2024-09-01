import { useForm } from "react-hook-form";
import { TodoFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryResponse } from "../../services/category-services";

type FormType = "CREATE" | "EDIT";

interface TodoFormProps {
  formType?: FormType;
  onTodoSubmit: (data: TodoFormData) => unknown;
  defaultValues?: TodoFormData;
  categories: CategoryResponse[];
}

const TodoForm = ({
  formType = "CREATE",
  defaultValues = { title: "", categoryId: 1 },
  onTodoSubmit,
  categories = [],
}: TodoFormProps) => {
  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<TodoFormData>({ resolver: zodResolver(schema), defaultValues });

  isSubmitSuccessful && reset();
  return (
    <form onSubmit={handleSubmit(onTodoSubmit)}>
      <div>
        <label htmlFor="title">Todo: </label>
        <input id="title" type="text" {...register("title")} />
        {errors?.title && <small>{errors.title.message}</small>}
      </div>
      <div>
        <label htmlFor="category">Category: </label>
        <select {...register("categoryId", { valueAsNumber: true })}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button>{formType === "CREATE" ? "Create" : "Edit"} todo</button>
    </form>
  );
};

export default TodoForm;
