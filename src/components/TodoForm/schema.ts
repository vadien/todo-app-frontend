import * as z from "zod";

export const schema = z.object({
  title: z.string().min(5).max(250),
  categoryId: z.number(),
});

export type TodoFormData = z.infer<typeof schema>;
