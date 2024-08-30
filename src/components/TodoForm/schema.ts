import * as z from "zod";

export const schema = z.object({
  title: z.string().min(3),
  category: z.string().min(3),
});

export type TodoFormData = z.infer<typeof schema>;
