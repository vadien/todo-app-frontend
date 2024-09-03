import { createCategory } from "./services/category-services";
import TodoListContainer from "./containers/TodoListContainer/TodoListContainer";
import CategoryForm from "./components/CategoryForm/CategoryForm";
import { CategoryFormData } from "./components/CategoryForm/schema";
import "./App.scss";
import InfoBar from "./components/InfoBar/InfoBar";

function App() {
  const onCategorySubmit = (data: CategoryFormData) => {
    createCategory(data)
      // .then((data) => setCategories([...categories, data]))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <InfoBar />
      <CategoryForm onCategorySubmit={onCategorySubmit} />
      <TodoListContainer />
    </>
  );
}

export default App;
