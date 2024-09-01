import { TodoFormData } from "../components/TodoForm/schema";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export interface TodoResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  category: { id: number; createdAt: string; updatedAt: string; name: string };
  dueAt: string;
  isArchived: boolean;
}

export const createTodo = async (data: TodoFormData) => {
  const response = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create todo!");
  }
  return (await response.json()) as TodoResponse;
};

export const getAllTodos = async () => {
  const response = await fetch(`${baseUrl}/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as TodoResponse[];
};

export const updateTodoById = async (id: number, data: TodoFormData) => {
  const response = await fetch(`${baseUrl}/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update");
  }
  return (await response.json()) as TodoResponse;
};

export const deleteTodoById = async (id: number) => {
  const response = await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete todo with id ${id}`);
  }
  return true;
};

export const archiveTodoById = async (id: number) => {
  const response = await fetch(`${baseUrl}/todos/${id}/archived`, {
    method: "PATCH",
    body: JSON.stringify({ isArchived: true }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to archive todo with id ${id}`);
  }
  return (await response.json()) as TodoResponse;
};
