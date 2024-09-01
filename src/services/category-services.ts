import { CategoryFormData } from "../components/CategoryForm/schema";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export interface CategoryResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  todos: {
    archived: boolean;
    createdAt: string;
    dueAt: string;
    id: number;
    title: string;
    updatedAt: string;
  };
}

// CREATE CATEGORY

export const createCategory = async (data: CategoryFormData) => {
  const response = await fetch(`${baseUrl}/categories`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create category");
  }
  return (await response.json()) as CategoryResponse;
};

export const getAllCategories = async () => {
  const response = await fetch(`${baseUrl}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as CategoryResponse[];
};

// UPDATE CATEGORY

export const updateCategoryById = async (
  id: number,
  data: CategoryFormData
) => {
  const response = await fetch(`${baseUrl}/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update category");
  }
  return (await response.json()) as CategoryResponse;
};

// DELETE CATEGORY
