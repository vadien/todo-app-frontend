import { useForm } from "react-hook-form";
import { CategoryFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./CategoryForm.module.scss";
import { FloppyDiskBack, Plus } from "@phosphor-icons/react";

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
    <>
      <form
        onSubmit={handleSubmit(onCategorySubmit)}
        className={styles.CategoryForm}
      >
        <div>
          <label htmlFor="name">Category: </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={styles.formInput}
          />
        </div>
        <button>
          {formType === "CREATE" ? (
            <Plus size={32} />
          ) : (
            <FloppyDiskBack size={32} />
          )}
        </button>
      </form>
      <div className={styles.errors}>
        {errors?.name && <small>{errors.name.message}</small>}
      </div>
    </>
  );
};

export default CategoryForm;
