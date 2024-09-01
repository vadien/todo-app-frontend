import * as z from "zod";

export const schema = z.object({
  name: z.string().min(3).max(250),
});

export type CategoryFormData = z.infer<typeof schema>;
