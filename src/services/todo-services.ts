const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export interface TodoResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  category: string;
  dueAt: string;
  archived: boolean;
}

export const getAllTodos = async () => {
  const response = await fetch(`${baseUrl}/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as TodoResponse[];
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
