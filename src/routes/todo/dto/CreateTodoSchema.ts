import { z } from "zod";

export const CreateTodoSchema = z.object({
    // name: z.string().min(1),
    // age: z.number().int().min(0),
    // phone: z.string().min(1)
    title: z.string().min(1),
    completed: z.boolean().default(false)
})

export type CreateTodoSchema = z.infer<typeof CreateTodoSchema>;