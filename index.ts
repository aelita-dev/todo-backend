import { Hono } from 'hono';
import todoApp from './src/routes/todo/todo';

const app = new Hono();

app.get("/", (c) => {
    return c.text("hello")
});

app.route('api/todo', todoApp);

export default { 
    port: 8000, 
    fetch: app.fetch, 
};

// const main = async () => {
//     const todos = await prisma.todo.findMany();
//     const todo = await prisma.todo.create({
//         data: {
//             title: "code",
//             completed: false,
//         }
//     });
//     console.log(todo);

//     const user = await prisma.user.create({
//         data: {
//             name: "john",
//             age: 91,
//             phone: "987654321"
//         }
//     })

//     console.log(user);
// }

// main()