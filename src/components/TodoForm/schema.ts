import * as z from "zod";

export const schema = z.object({
  title: z.string().min(5).max(250),
  category: z.string().min(3).max(250),
});

export type TodoFormData = z.infer<typeof schema>;
