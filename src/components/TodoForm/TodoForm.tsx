import { useForm } from "react-hook-form";
import { TodoFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryResponse } from "../../services/category-services";
import styles from "./TodoForm.module.scss";
import { FloppyDiskBack, Plus } from "@phosphor-icons/react";

type FormType = "CREATE" | "EDIT";

interface TodoFormProps {
  formType?: FormType;
  onTodoSubmit: (data: TodoFormData) => unknown;
  defaultValues?: TodoFormData;
  categories: CategoryResponse[];
}

const TodoForm = ({
  formType = "CREATE",
  defaultValues = { title: "", categoryId: 1, archived: false },
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
    <form onSubmit={handleSubmit(onTodoSubmit)} className={styles.TodoForm}>
      <div>
        <label htmlFor="title">Todo: </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className={styles.formInput}
        />
        {errors?.title && <small>{errors.title.message}</small>}
      </div>
      <div>
        <select
          {...register("categoryId", { valueAsNumber: true })}
          className={styles.formSelect}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button>
        {formType === "CREATE" ? (
          <Plus size={32} />
        ) : (
          <FloppyDiskBack size={32} />
        )}
      </button>
    </form>
  );
};

export default TodoForm;
