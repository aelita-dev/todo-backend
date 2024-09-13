import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { prisma } from "../../prisma";
import { CreateTodoSchema } from "./dto/CreateTodoSchema";
import { UpdateTodoSchema } from "./dto/UpdateTodoSchema";

const todoApp = new Hono()


todoApp.get('/', async (c) => {
    const todos = await prisma.todo.findMany();
    return c.json(todos);
});


todoApp.get('/:todoId', async (c) => {
    const todo = await prisma.todo.findUniqueOrThrow({
        where: {
            id: c.req.param("todoId")
        }
    });
    return c.json(todo);
})


todoApp.post(
    '/',
    zValidator(
        'form',
        CreateTodoSchema
    ),
    async (c) => {
        const validatedData = c.req.valid('form');
        const newTodo = await prisma.todo.create({
            data: validatedData
        })

        return c.json(newTodo);
    }
)


todoApp.put(
    '/:todoId',
    zValidator(
        'form',
        UpdateTodoSchema
    ),
    async (c) => {
        const validatedData = c.req.valid('form');

        const updatedTodo = await prisma.todo.update({
            where: {
                id: c.req.param("todoId")
            },
            data: validatedData
        })
    console.log(updatedTodo);
    return c.json(updatedTodo)
    
})


todoApp.delete(
    '/:todoId', async (c) => {
        await prisma.todo.delete({
            where: {
                id: c.req.param("todoId")
            }
        })
    return c.json({
        response: 'OK'
    });
});

export default todoApp;