import { z } from "zod";

export const UpdateTodoSchema = z.object({
    title: z.string().min(1).optional(),
    completed: z.boolean().default(false).optional()
})

export type UpdateTodoSchema = z.infer<typeof UpdateTodoSchema>;