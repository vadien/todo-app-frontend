import { useEffect } from "react";
import { createCategory, getAllCategories } from "./services/category-services";
import TodoListContainer from "./containers/TodoListContainer/TodoListContainer";
import CategoryForm from "./components/CategoryForm/CategoryForm";
import { CategoryFormData } from "./components/CategoryForm/schema";

function App() {
  useEffect(() => {
    getAllCategories().then(console.log).catch(console.error);
  }, []);

  const onCategorySubmit = (data: CategoryFormData) => {
    createCategory(data).catch((e) => console.log(e));
  };

  return (
    <>
      <h1>Hello World!</h1>
      <CategoryForm onCategorySubmit={onCategorySubmit} />
      <TodoListContainer />
    </>
  );
}

export default App;
