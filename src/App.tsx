import {
  CategoryResponse,
  createCategory,
  getAllCategories,
} from "./services/category-services";
import TodoListContainer from "./containers/TodoListContainer/TodoListContainer";
import CategoryForm from "./components/CategoryForm/CategoryForm";
import { CategoryFormData } from "./components/CategoryForm/schema";
import "./App.scss";
import InfoBar from "./components/InfoBar/InfoBar";
import { useEffect, useState } from "react";

function App() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const onCategorySubmit = (data: CategoryFormData) => {
    createCategory(data)
      .then((data) => setCategories([...categories, data]))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <InfoBar />
      <CategoryForm onCategorySubmit={onCategorySubmit} />
      <TodoListContainer categories={categories} />
    </>
  );
}

export default App;
