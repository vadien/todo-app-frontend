import { useForm } from "react-hook-form";
import { CategoryFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

type FormType = "CREATE" | "EDIT";

interface CategoryFormProps {
  formType?: FormType;
  onCategorySubmit: (data: CategoryFormData) => unknown;
  defaultValues?: CategoryFormData;
}

const CategoryForm = ({
  formType = "CREATE",
  defaultValues = { name: "" },
  onCategorySubmit,
}: CategoryFormProps) => {
  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  isSubmitSuccessful && reset();
  return (
    <form onSubmit={handleSubmit(onCategorySubmit)}>
      <div>
        <label htmlFor="name">Category Name: </label>
        <input id="name" type="text" {...register("name")} />
        {errors?.name && <small>{errors.name.message}</small>}
      </div>
      <button>Create category</button>
    </form>
  );
};

export default CategoryForm;
